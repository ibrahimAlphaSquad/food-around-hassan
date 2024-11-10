import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const userName = cookies.get("userName");

function Order() {
  const [orders, setOrders] = useState(null);
  const [noOrders, setNoOrders] = useState(true);
  const location = useLocation(); // Get the current location
  const history = useHistory();

  const logout = () => {
    cookies.remove("ka_token", { path: "/" });
    cookies.remove("userId", { path: "/" });
    cookies.remove("userEmail", { path: "/" });
    cookies.remove("userName", { path: "/" });
    cookies.remove("userRole", { path: "/" });
    history.push("/login");
  };

  useEffect(() => {
    const token = cookies.get("ka_token");
    const id = cookies.get("userId");
    const role = "customer"; // Hardcoded Chef/Customer Id, later fetched from Token
    console.log("ID is ", id);
    async function orderHandler() {
      const result = await axios({
        method: "post",
        url: "http://localhost:3002/orders/get/incomplete",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: { id, role },
      });
      console.log(result);
      if (result.data.length === 0) {
        setNoOrders(true);
      }
      setOrders(result.data.orders);
    }
    orderHandler();
  }, []);

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <span>KhanSaama</span>
        </div>
        <div className="header__profile">
          <p>
            Hi, <span>{userName}</span>
          </p>
          <ul
            className="navbar-nav"
            style={{
              display: "flex",
              gap: "1em",
              listStyle: "none",
              padding: 0,
              margin: 0,
              flexDirection: "row",
            }}
          >
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/home"
                style={location.pathname === "/home" ? activeStyle : {}}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/customer-order"
                style={
                  location.pathname === "/customer-order" ? activeStyle : {}
                }
              >
                My Orders
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-light logout-button"
                onClick={logout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </header>
      <br />
      <div className="row" style={{ marginLeft: "10px" }}></div>

      {noOrders ? (
        <div id="loginRedir">
          <Link to="/home">You Have No orders yet</Link>
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
                {console.log("data is ", orders)}
                {orders &&
                  orders[0].itemsOrdered.map((order) => (
                    <div className="col-lg-6 menu-item">
                      <img
                        src={require("../../../assets/img/menu/lobster-bisque.jpg")}
                        className="menu-img"
                        alt="e"
                      />
                      <div className="menu-content">
                        <a href="#">{order.itemName}</a>
                        <span>{order.itemTotalPrice} Pkr</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

// Inline style for active link
const activeStyle = {
  color: "#ffadad", // Lighter color for active link
  fontWeight: "bold",
  textDecoration: "underline",
};

export default Order;
