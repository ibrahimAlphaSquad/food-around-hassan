import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Chefs from "../Chefs/Chefs";
import Spinner from "../Spinner/Spinner";
import "./CustomerHomepage.css";

const cookies = new Cookies();

const userName = cookies.get('userName');
function CustomerHomePage(props) {
  const [chefs, setChefs] = useState(null);
  //console.log(`User data is ${props.location.state.userData}`);
  useEffect(() => {
    async function fetchChefs() {
      const request = await fetch("http://localhost:3002/role/chefs/");
      const response = await request.json();
      console.log(response);
      setChefs(response);
    }
    fetchChefs();
  }, []);
  return (
    <>
      <div className="customer__homepage">
        <header className="header">
          <div className="header__logo">
            <span>KhanSaama</span>
          </div>
          <div className="header__profile">
            <p>
              Hi, <span>{userName}</span>
            </p>
            <ul className="navbar-nav" style={{textTransform: "none", display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "1em"}}>
              <li className="nav-item">
                <Link className="nav-link" to="/customer-order">
                  My Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </header>

        {chefs ? <Chefs chefs={chefs} /> : <Spinner />}
      </div>
    </>
  );
}

export default CustomerHomePage;
