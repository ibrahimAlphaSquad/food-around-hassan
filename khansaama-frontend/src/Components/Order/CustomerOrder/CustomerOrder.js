import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import UserNavbar from "../../Navbar/UserNavbar";

const cookies = new Cookies();

function Order() {
  const [orders, setOrders] = useState(null);
  const [noOrders, setNoOrders] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const styles = {
    container: {
      backgroundColor: "#1a1814",
      minHeight: "100vh",
      color: "white",
      padding: "20px",
    },
    pageTitle: {
      color: "#cda45e",
      textAlign: "center",
      fontSize: "32px",
      padding: "40px 0",
      fontWeight: "600",
    },
    ordersContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
    },
    orderCard: {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "30px",
    },
    orderHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: "15px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      marginBottom: "20px",
    },
    orderNumber: {
      color: "#cda45e",
      fontSize: "20px",
      fontWeight: "600",
    },
    orderDate: {
      color: "#aaa",
      fontSize: "14px",
    },
    itemContainer: {
      display: "flex",
      alignItems: "center",
      padding: "15px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: "6px",
      marginBottom: "15px",
    },
    itemImage: {
      width: "80px",
      height: "80px",
      borderRadius: "8px",
      objectFit: "cover",
      marginRight: "20px",
    },
    itemDetails: {
      flex: 1,
    },
    itemName: {
      fontSize: "18px",
      color: "#cda45e",
      marginBottom: "8px",
    },
    itemPrice: {
      fontSize: "16px",
      color: "#fff",
      marginBottom: "5px",
    },
    quantity: {
      fontSize: "14px",
      color: "#aaa",
    },
    noOrders: {
      textAlign: "center",
      padding: "40px",
      color: "#cda45e",
    },
    homeButton: {
      backgroundColor: "#cda45e",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      marginTop: "20px",
      transition: "background-color 0.3s",
    },
    orderTotal: {
      textAlign: "right",
      marginTop: "15px",
      paddingTop: "15px",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      color: "#cda45e",
      fontSize: "18px",
      fontWeight: "600",
    },
  };

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

        const result = await axios({
          method: "post",
          url: "http://localhost:3002/orders/get/incomplete",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          data: { id, role: "customer" },
          timeout: 10000,
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
        setError(err.message || "Failed to fetch orders");
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
        <div style={styles.container}>
          <div style={{ textAlign: "center", padding: "40px" }}>
            Loading your orders...
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <UserNavbar />
        <div style={styles.container}>
          <div
            style={{ textAlign: "center", padding: "40px", color: "#dc3545" }}
          >
            <p>{error}</p>
            <button
              onClick={() => (window.location.href = "/home")}
              style={styles.homeButton}
            >
              Return to Home
            </button>
          </div>
        </div>
      </>
    );
  }

  console.log({ orders });

  return (
    <>
      <UserNavbar />
      <div style={styles.container}>
        <h1 style={styles.pageTitle}>YOUR ORDERS</h1>

        {noOrders ? (
          <div style={styles.noOrders}>
            <p>You don't have any orders yet</p>
            <button
              onClick={() => (window.location.href = "/home")}
              style={styles.homeButton}
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div style={styles.ordersContainer}>
            {orders &&
              orders.map((order, orderIndex) => (
                <div key={orderIndex} style={styles.orderCard}>
                  <div style={styles.orderHeader}>
                    <div style={styles.orderNumber}>
                      Order #{order._id.slice(-4)}
                    </div>
                    <div style={styles.orderDate}>
                      {new Date(order.orderDate).toLocaleString()}
                    </div>
                  </div>

                  {order.itemsOrdered.map((item, itemIndex) => {
                    console.log({ item });
                    return (
                      <div key={itemIndex} style={styles.itemContainer}>
                        <img
                          src={
                            item.itemImage ||
                            require("../../../assets/img/menu/lobster-bisque.jpg")
                          }
                          style={styles.itemImage}
                          alt={item.itemName}
                        />
                        <div style={styles.itemDetails}>
                          <div style={styles.itemName}>{item.itemName}</div>
                          <div style={styles.itemPrice}>
                            {item.itemTotalPrice} PKR
                          </div>
                          <div style={styles.quantity}>
                            QUANTITY: {item.quantity || 1}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div style={styles.orderTotal}>
                    Total Amount:{" "}
                    {order.itemsOrdered.reduce(
                      (total, item) =>
                        total + item.itemTotalPrice * (item.quantity || 1),
                      0
                    )}{" "}
                    PKR
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Order;
