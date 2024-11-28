import React, { useState, useEffect } from "react";
import NavBar from "../Navbar/ChefNavbar";
import axios from "axios";
import Cookies from "universal-cookie";
import { Redirect, Link } from "react-router-dom";
import "./ChefOrder.css";

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
          throw new Error("Authentication required");
        }

        const role = "chef";

        const result = await axios({
          method: "post",
          url: "http://localhost:3002/orders/get/incomplete",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          data: { id, role },
          timeout: 10000
        });

        const ordersData = result.data.orders;

        if (!ordersData || ordersData.length === 0) {
          setNoOrders(true);
          setOrders(null);
        } else {
          setNoOrders(false);
          setOrders(ordersData);
        }
      } catch (err) {
        let errorMessage = "Failed to fetch orders. ";

        if (err.response) {
          switch (err.response.status) {
            case 401:
              errorMessage = "Please login again to view orders.";
              break;
            case 403:
              errorMessage = "You don't have permission to view these orders.";
              break;
            case 404:
              errorMessage = "No orders found.";
              break;
            default:
              errorMessage += err.response.data?.message || "Please try again later.";
          }
        } else if (err.request) {
          errorMessage = "Cannot connect to server. Please check your connection.";
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

    // Polling for new orders every 30 seconds
    const pollInterval = setInterval(fetchOrders, 30000);

    return () => clearInterval(pollInterval);
  }, []);

  const handleAcceptOrder = async (orderId) => {
    try {
      const token = cookies.get("ka_token");
      await axios({
        method: "post",
        url: `http://localhost:3002/orders/accept/${orderId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        }
      });
      
      // Refresh orders after accepting
      window.location.reload();
    } catch (err) {
      setError("Failed to accept order. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <>
        <NavBar />
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading orders...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="error-container">
          <p className="error-message">{error}</p>
          <Link to="/dashboard" className="dashboard-link">Return to Dashboard</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="orders-container">
        {noOrders ? (
          <div className="no-orders">
            <h2>No New Orders</h2>
            <Link to="/dashboard" className="dashboard-link">
              Return to Dashboard
            </Link>
          </div>
        ) : (
          <section id="menu" className="menu section-bg">
            <div className="container" data-aos="fade-up">
              <div className="section-title">
                <h2>New Orders</h2>
                <p>Pending Orders List</p>
              </div>
              
              <div className="row menu-container" data-aos="fade-up" data-aos-delay={200}>
                {orders && orders.map((orderGroup, groupIndex) => (
                  <div key={groupIndex} className="col-lg-6 order-card">
                    <div className="order-header">
                      <h3>Order #{orderGroup._id.slice(-4)}</h3>
                      <span className="order-time">
                        {new Date(orderGroup.createdAt).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="items-list">
                      {orderGroup.itemsOrdered.map((item, itemIndex) => (
                        <div key={itemIndex} className="menu-item">
                          <img
                            src={require("../../assets/img/menu/lobster-bisque.jpg")}
                            className="menu-img"
                            alt={item.itemName}
                          />
                          <div className="item-details">
                            <div className="menu-content">
                              <h4>{item.itemName}</h4>
                              <span className="price">{item.itemTotalPrice} Pkr</span>
                            </div>
                            <div className="item-info">
                              <p>Quantity: {item.quantity || 1}</p>
                              {item.specialInstructions && (
                                <p className="special-instructions">
                                  Notes: {item.specialInstructions}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="order-actions">
                      <button 
                        className="accept-btn"
                        onClick={() => handleAcceptOrder(orderGroup._id)}
                      >
                        Accept Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default Order;