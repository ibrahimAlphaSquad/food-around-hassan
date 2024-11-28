import React, { useState, useEffect } from "react";
import NavBar from "../Navbar/ChefNavbar";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

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
          timeout: 10000,
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
              errorMessage +=
                err.response.data?.message || "Please try again later.";
          }
        } else if (err.request) {
          errorMessage =
            "Cannot connect to server. Please check your connection.";
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
        },
      });
      window.location.reload();
    } catch (err) {
      setError("Failed to accept order. Please try again.");
    }
  };

  const styles = {
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "50vh",
      color: "#333",
      background: "#1a1814",
      padding: "20px",
    },
    errorContainer: {
      textAlign: "center",
      padding: "2rem",
      color: "#dc3545",
      background: "#1a1814",
    },
    mainContainer: {
      backgroundColor: "#1a1814",
      minHeight: "calc(100vh - 80px)",
      color: "white",
      padding: "20px",
    },
    sectionTitle: {
      textAlign: "center",
      padding: "30px 0",
    },
    sectionTitleH2: {
      fontSize: "32px",
      color: "white",
      marginBottom: "10px",
    },
    sectionSubtitle: {
      color: "#cda45e",
      fontSize: "18px",
    },
    orderCard: {
      background: "rgba(255, 255, 255, 0.08)",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "20px",
    },
    orderHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      paddingBottom: "15px",
      marginBottom: "20px",
    },
    orderNumber: {
      color: "#cda45e",
      fontSize: "20px",
      margin: 0,
    },
    orderTime: {
      color: "#aaa",
      fontSize: "14px",
    },
    itemContainer: {
      display: "flex",
      alignItems: "center",
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "6px",
      padding: "15px",
      marginBottom: "15px",
    },
    itemImage: {
      width: "80px",
      height: "80px",
      objectFit: "cover",
      borderRadius: "6px",
      marginRight: "15px",
    },
    itemDetails: {
      flex: 1,
    },
    itemName: {
      color: "white",
      fontSize: "18px",
      marginBottom: "5px",
    },
    itemPrice: {
      color: "#cda45e",
      fontSize: "16px",
      fontWeight: "bold",
    },
    itemQuantity: {
      color: "#aaa",
      fontSize: "14px",
      marginTop: "5px",
    },
    specialNotes: {
      color: "#aaa",
      fontStyle: "italic",
      fontSize: "14px",
      marginTop: "5px",
    },
    acceptButton: {
      backgroundColor: "#cda45e",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      width: "100%",
      marginTop: "15px",
      transition: "background-color 0.3s",
    },
    noOrdersContainer: {
      textAlign: "center",
      padding: "40px",
      color: "#cda45e",
    },
    dashboardLink: {
      display: "inline-block",
      padding: "10px 20px",
      backgroundColor: "#cda45e",
      color: "white",
      textDecoration: "none",
      borderRadius: "4px",
      marginTop: "20px",
      transition: "background-color 0.3s",
    },
  };

  if (isLoading) {
    return (
      <>
        <NavBar />
        <div style={styles.loadingContainer}>Loading orders...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div style={styles.errorContainer}>
          <p>{error}</p>
          <Link to="/dashboard" style={styles.dashboardLink}>
            Return to Dashboard
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div style={styles.mainContainer}>
        <div style={styles.sectionTitle}>
          <h2 style={styles.sectionTitleH2}>New Orders</h2>
          <p style={styles.sectionSubtitle}>Pending Orders List</p>
        </div>

        {noOrders ? (
          <div style={styles.noOrdersContainer}>
            <h2>No New Orders</h2>
            <Link to="/dashboard" style={styles.dashboardLink}>
              Return to Dashboard
            </Link>
          </div>
        ) : (
          <div className="container">
            <div className="row">
              {orders &&
                orders.map((orderGroup, groupIndex) => (
                  <div key={groupIndex} className="col-lg-6">
                    <div style={styles.orderCard}>
                      <div style={styles.orderHeader}>
                        <h3 style={styles.orderNumber}>
                          Order #{orderGroup._id.slice(-4)}
                        </h3>
                        <span style={styles.orderTime}>
                          {new Date(orderGroup.createdAt).toLocaleString()}
                        </span>
                      </div>

                      {orderGroup.itemsOrdered.map((item, itemIndex) => (
                        <div key={itemIndex} style={styles.itemContainer}>
                          <img
                            src={require("../../assets/img/menu/lobster-bisque.jpg")}
                            style={styles.itemImage}
                            alt={item.itemName}
                          />
                          <div style={styles.itemDetails}>
                            <div style={styles.itemName}>{item.itemName}</div>
                            <div style={styles.itemPrice}>
                              {item.itemTotalPrice} Pkr
                            </div>
                            <div style={styles.itemQuantity}>
                              Quantity: {item.quantity || 1}
                            </div>
                            {item.specialInstructions && (
                              <div style={styles.specialNotes}>
                                Notes: {item.specialInstructions}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      <button
                        style={styles.acceptButton}
                        onClick={() => handleAcceptOrder(orderGroup._id)}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#d4b36b")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#cda45e")
                        }
                      >
                        Accept Order
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Order;
