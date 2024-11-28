import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import UserNavbar from "../../Navbar/UserNavbar";

const cookies = new Cookies();

function Order() {
  const [orders, setOrders] = useState(null);
  const [noOrders, setNoOrders] = useState(true);

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
      console.log(result.data.orders);
      if (result.data.length === 0) {
        setNoOrders(true);
      } else {
        setNoOrders(false);
        setOrders(result.data.orders);
      }
    }
    orderHandler();
  }, []);

  return (
    <>
      <UserNavbar />
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

export default Order;
