const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// const date = new Date();
// var dd = date.getDate();
// var mm = date.getMonth();
// var yy = date.getFullYear();
// var hh = date.getHours();
// var mn = date.getMinutes();
//creates an order schema
var orderSchema = new Schema ({

    itemsOrdered: [{

        
        itemId:
            {
                type: Schema.ObjectId,
                ref: "Food",
                required: true
            },
        itemName: {
                type: String,
                required: true
        },
        itemQuantity: {
                type: Number,
                required: false,
            },
        itemSeller: {
            type: Schema.ObjectId,
            ref: "Chef",
            required: true
        },
        itemSellerName: {
            type: String
        },
        itemTotalPrice: {
            type: Number,
            require: true
        }
        
    } ],
    orderedBy: {
        type: Schema.ObjectId,
        ref: "Customer",
        required: true
    },

    customerName: {
        type: String
    },

    createdBy: {
        type: [Schema.ObjectId],
        ref: "Chef",
        required: true
    },

    chefNames: {
        type: [String]
    },

    orderDate: {
        type: Date,
        default: new Date()
    },

    status: {
        type: String,
        enum: ["PLACED", "ONGOING", "SHIPPED", "COMPLETE", "CANCELLED"],
        default: "PLACED"
    },
    paymentInfo: {
        amount: {
            type: Number,
            required: false,
        },
        paymentType: {
            type: String,
            enum: ["COD", "CARD"]
        },
        paymentStatus: {
            type: String,
            enum: ["FAILED", "COMPLETE", "ON-HOLD", "ERROR"]
        },
        paymentReceipt: {
            type: String,
            default: null,
        },
        stripePaymentId: {
            type: String,
            default: null
        },
        paymentCard: {
            brand: String,
            last4: String,
            exp_year: Number,
            exp_month: Number
        }
    }

});

//Creates ths order model
var Order = mongoose.model("Order", orderSchema);

//exports the model
module.exports = {Order};