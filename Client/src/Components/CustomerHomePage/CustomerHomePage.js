import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Chefs from "../Chefs/Chefs";
import Spinner from "../Spinner/Spinner";
import "./CustomerHomepage.css";
import UserNavbar from "../Navbar/UserNavbar";

const cookies = new Cookies();

function CustomerHomePage(props) {
  const [chefs, setChefs] = useState(null);

  useEffect(() => {
    async function fetchChefs() {
      const request = await fetch("http://localhost:3002/role/chefs/");
      const response = await request.json();
      setChefs(response);
    }
    fetchChefs();
  }, []);

  return (
    <div className="customer__homepage">
      <UserNavbar />
      {chefs ? <Chefs chefs={chefs} /> : <Spinner />}
    </div>
  );
}

export default CustomerHomePage;
