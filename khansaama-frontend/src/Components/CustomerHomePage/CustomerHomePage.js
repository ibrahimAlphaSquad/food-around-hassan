import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Chefs from "../Chefs/Chefs";
import Spinner from "../Spinner/Spinner";
import "./CustomerHomepage.css";
import UserNavbar from "../Navbar/UserNavbar";

const cookies = new Cookies();

function CustomerHomePage(props) {
  const [chefs, setChefs] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    async function fetchChefs() {
      try {
        setIsLoading(true); // Start loading
        const response = await fetch("http://localhost:3002/role/chefs/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setChefs(data); // Set the fetched data
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setIsLoading(false); // End loading
      }
    }
    fetchChefs();
  }, []);

  // Conditional rendering based on state
  if (isLoading) return <p>Loading chefs...</p>;
  if (error) return <p>Error fetching chefs: {error}</p>;

  return (
    <div className="customer__homepage">
      <UserNavbar />
      {chefs ? <Chefs chefs={chefs} /> : <Spinner />}
    </div>
  );
}

export default CustomerHomePage;
