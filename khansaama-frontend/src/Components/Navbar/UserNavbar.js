import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const userName = cookies.get("userName");

function UserNavbar(props) {
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    // Clear cookies or any other authentication data
    cookies.remove("ka_token", { path: "/" });
    cookies.remove("userId", { path: "/" });
    cookies.remove("userEmail", { path: "/" });
    cookies.remove("userName", { path: "/" });
    cookies.remove("userRole", { path: "/" });

    localStorage.removeItem("cart");

    // Redirect to login page
    history.push("/login");
  };

  return (
    <div>
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
              <Link
                className="nav-link"
                to="/cart"
                style={location.pathname === "/cart" ? activeStyle : {}}
              >
                Cart
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
    </div>
  );
}

// Inline style for active link
const activeStyle = {
  color: "#ffadad", // Lighter color for active link
  fontWeight: "bold",
  textDecoration: "underline",
};

export default UserNavbar;
