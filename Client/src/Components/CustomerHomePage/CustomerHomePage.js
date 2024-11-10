import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import Chefs from "../Chefs/Chefs";
import Spinner from "../Spinner/Spinner";
import "./CustomerHomepage.css";

const cookies = new Cookies();
const userName = cookies.get("userName");

function CustomerHomePage(props) {
  const [chefs, setChefs] = useState(null);
  const location = useLocation(); // Get the current location
  const history = useHistory();

  useEffect(() => {
    async function fetchChefs() {
      const request = await fetch("http://localhost:3002/role/chefs/");
      const response = await request.json();
      setChefs(response);
    }
    fetchChefs();
  }, []);

  const logout = () => {
    cookies.remove("ka_token", { path: "/" });
    cookies.remove("userId", { path: "/" });
    cookies.remove("userEmail", { path: "/" });
    cookies.remove("userName", { path: "/" });
    cookies.remove("userRole", { path: "/" });
    history.push("/login");
  };

  return (
    <div className="customer__homepage">
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

      {chefs ? <Chefs chefs={chefs} /> : <Spinner />}
    </div>
  );
}

// Inline style for active link
const activeStyle = {
  color: "#ffadad", // Lighter color for active link
  fontWeight: "bold",
  textDecoration: "underline",
};

export default CustomerHomePage;
