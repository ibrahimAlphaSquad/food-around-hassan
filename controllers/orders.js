require('dotenv').config();
const { mongoose, ObjectID } = require("../app/config/");
const stripe = require('stripe')(process.env.STRIPE_SECRET_DEV);
const { Order } = require("../models/order");
const { Chef } = require("../models/chef");
const { Customer } = require("../models/customer.js");
const { Food } = require("../models/food.js");

module.exports = {
  placeOrder: async (req, res, next) => {
    var newOrder;
    let { itemsOrdered, orderedBy, amount, paymentType, source } = req.body;
    let createdBy = [];
    let chefNames = [];
    let itemsDetails = [];
    let customerName = "";
    let customerEmail = "";
    let paymentInfo = {};
    let orderDate = new Date();
    const amountConverted = amount * 100;


    if(orderedBy) {
      await Customer.findById(orderedBy).then((customer) => {
        customerName = customer.name;
        customerEmail = customer.email;
        customerPhone = customer.phone;
      });
    } else {
      orderedBy = !orderedBy ? new ObjectID() : orderedBy;
      customerName = "Guest";
        customerEmail = "guest@khansaama.com";
        customerPhone = "12345678901";
    }

    for (var i = 0; i < itemsOrdered.length; i++) {
      chefNames.push(itemsOrdered[i].chefName);
      createdBy.push(itemsOrdered[i].chefID);
      itemsDetails.push({
        itemId: itemsOrdered[i].foodID,
        itemName: itemsOrdered[i].foodName,
        itemQuantity: itemsOrdered[i].quantity,
        itemSeller: itemsOrdered[i].chefID,
        itemSellerName: itemsOrdered[i].chefName,
        itemTotalPrice: itemsOrdered[i].foodPrice * itemsOrdered[i].quantity,
      });
    }

    const orderId = new ObjectID();

    let orderStripeCharge;

    paymentInfo.paymentType = paymentType;
    if(paymentInfo.paymentType === "CARD") {

      //TODO: Add Stripe here
      orderStripeCharge = await stripe.charges.create({
        amount: amountConverted,
        currency: 'pkr',
        source,
        description: `Payment for order ${orderId}`,
        metadata: {
          customerName,
          customerEmail,
          customerPhone
        }
      });

      if(!orderStripeCharge.id || !orderStripeCharge.status === "succeeded" || !orderStripeCharge.status === "pending") {
        return res.status(500).send({success: false, error: "Error chargin customer"});
      }

      const {brand, exp_year, exp_month, last4} = orderStripeCharge.payment_method_details.card;
  
      //Replace amount sent by client with the actual amount charged
      amount = orderStripeCharge.amount / 100;
      paymentInfo = {
        paymentType,
        paymentStatus: orderStripeCharge.status === "succeeded" ? "COMPLETE" : orderStripeCharge.status === "failed" ? "FAILED" : orderStripeCharge.status === "pending" ? "ON-HOLD" : null,
        paymentReceipt: orderStripeCharge.receipt_url,
        stripePaymentId: orderStripeCharge.id,
        paymentCard: {
          brand,
          exp_year,
          exp_month,
          last4
        },
        amount
      }
    }

    newOrder = new Order({
      _id: orderId,
      itemsOrdered: itemsDetails,
      orderedBy,
      customerName,
      createdBy,
      chefNames,
      orderDate,
      paymentInfo
    });

    await newOrder
      .save()
      .then((order) => {
        console.log("Order Saved ", order);
        res.status(200).send({success: true, orderDetails: order});
      })
      .catch((err) => {
        console.log("Order Error ", err);
        res.status(200).send({success: false, error: err});
      });
    return next();
  },

  updateOrder: async (req, res) => {

    const { status } = req.body;
    const orderId = req.params.orderId;

    if(!status || !["ONGOING", "SHIPPED", "COMPLETE", "CANCELLED"].includes(status)) {
      return res.status(500).send({success: false, error: `Invalid order status sent => ${status}`});
    }

    Order.findByIdAndUpdate({_id: orderId}, {status}, (err, doc) => {
      if(err) {
        return res.status(500).send({success: false, error: `Error updating order: ${err}`});
      }

      return res.status(200).send({success: true, updatedOrder: doc});
    });

  },

  getIncomplete: async (req, res, next) => {
    var ongoingOrders;

    if (req.body.role === "chef") {
      ongoingOrders = await Order.find({
        "itemsOrdered.itemSeller": req.body.id,
        status: {$in: ["PLACED", "ONGOING"]}
      });
      res.status(200).send({ orders: ongoingOrders });
    } else if (req.body.role === "customer") {
      ongoingOrders = await Order.find({ orderedBy: req.body.id, status: {$in: ["PLACED", "ONGOING"]} });

      res.status(200).send({ orders: ongoingOrders });
    }
  },

  getAll: async (req, res, next) => {
    var allOrders;

    if (req.body.role === "chef") {
      allOrders = await Order.find({ createdBy: req.body.id });
      res.status(200).send({ orders: allOrders });
    } else if (req.body.role === "customer") {
      allOrders = await Order.find({ orderedBy: req.body.id });

      res.status(200).send({ orders: allOrders });
    }
  },

  getById: async (req, res, next) => {
    Order.findById(req.params.id).then((order) => {
      res.send(order);
    });
  },
}