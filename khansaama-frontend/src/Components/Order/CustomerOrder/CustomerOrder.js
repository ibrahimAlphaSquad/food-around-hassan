import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import UserNavbar from "../../Navbar/UserNavbar";
import "./Order.css"; // Assuming you have a CSS file for styling

const cookies = new Cookies();

function Order() {
  const [orders, setOrders] = useState(null);
  const [noOrders, setNoOrders] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = cookies.get("ka_token");
        const id = cookies.get("userId");

        if (!token || !id) {
          throw new Error("Please login to view your orders");
        }

        const role = "customer";

        const result = await axios({
          method: "post",
          url: "http://localhost:3002/orders/get/incomplete",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          data: { id, role },
          timeout: 10000, // 10 second timeout
        });

        if (!result.data || !result.data.orders) {
          setNoOrders(true);
          setOrders(null);
        } else {
          const ordersData = result.data.orders;
          if (ordersData.length === 0) {
            setNoOrders(true);
            setOrders(null);
          } else {
            setNoOrders(false);
            setOrders(ordersData);
          }
        }
      } catch (err) {
        let errorMessage = "Failed to fetch orders. ";

        if (err.response) {
          switch (err.response.status) {
            case 401:
              errorMessage = "Please login again to view your orders.";
              break;
            case 403:
              errorMessage = "You don't have permission to view these orders.";
              break;
            case 404:
              errorMessage = "No orders found.";
              break;
            default:
              errorMessage +=
                err.response.data?.message || "Please try again later.";
          }
        } else if (err.request) {
          errorMessage =
            "Cannot connect to server. Please check your internet connection.";
        } else {
          errorMessage = err.message || "An unexpected error occurred.";
        }

        setError(errorMessage);
        setOrders(null);
        setNoOrders(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <>
        <UserNavbar />
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading your orders...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <UserNavbar />
        <div className="error-container">
          <p className="error-message">{error}</p>
          <Link to="/home" className="home-link">
            Return to Home
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <UserNavbar />
      {noOrders ? (
        <div className="no-orders-container">
          <p>You don't have any orders yet</p>
          <Link to="/home" className="home-link">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div>
          <section id="menu" className="menu section-bg">
            <div className="container" data-aos="fade-up">
              <div className="section-title">
                <p>Your Orders</p>
              </div>
              <div
                className="col menu-container"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                {orders && orders[0]?.itemsOrdered?.length > 0 ? (
                  orders[0].itemsOrdered.map((order, index) => (
                    <div className="col-lg-6 menu-item" key={index}>
                      <img
                        src={
                          order.itemImage ||
                          require("../../../assets/img/menu/lobster-bisque.jpg")
                        }
                        className="menu-img"
                        alt={order.itemName}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = require("../../../assets/img/menu/lobster-bisque.jpg");
                        }}
                      />
                      <div className="menu-content">
                        <div className="item-name">{order.itemName}</div>
                        <div className="item-price">
                          {order.itemTotalPrice} Pkr
                        </div>
                      </div>
                      <div className="menu-details">
                        <p>Quantity: {order.quantity || 1}</p>
                        {order.specialInstructions && (
                          <p>Notes: {order.specialInstructions}</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-items-message">
                    <p>No items found in your order</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Order;
