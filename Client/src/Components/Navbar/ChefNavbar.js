import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function ChefNavBar(props) {
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    // Clear cookies or any other authentication data
    cookies.remove("ka_token", { path: "/" });
    cookies.remove("userId", { path: "/" });
    cookies.remove("userEmail", { path: "/" });
    cookies.remove("userName", { path: "/" });
    cookies.remove("userRole", { path: "/" });

    // Redirect to login page
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/register">
        KhanSaama
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav mr-auto">
          <li
            className={`nav-item ${
              location.pathname === "/dashboard" ? "active" : ""
            }`}
          >
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li
            className={`nav-item ${
              location.pathname === "/add/food" ? "active" : ""
            }`}
          >
            <Link className="nav-link" to="/add/food">
              Add Food
            </Link>
          </li>
          <li
            className={`nav-item ${
              location.pathname === "/orders" ? "active" : ""
            }`}
          >
            <Link className="nav-link" to="/orders">
              My Orders
            </Link>
          </li>
        </ul>
        <button className="btn btn-outline-light ml-auto" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default ChefNavBar;
