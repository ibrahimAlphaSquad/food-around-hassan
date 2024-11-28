import React, { useState } from "react";
import FoodCard from "../Cards/FoodCard";
//import NavBar from '../Navbar/ChefNavBar';
import NavBar from "../Navbar/ChefNavbar";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
function Dashboard(props) {
  let userId;
  let userName;
  const cookies = new Cookies();
  const [foods, setChefFoods] = useState([]);

  useEffect(() => {
    userId = cookies.get("userId");
    userName = cookies.get("userName");
    console.log(`user Id is ${userId}`);
    console.log(`user name is ${userName}`);

    async function fetchFoodForChefs() {
      // const request = await fetch("http://localhost:3002/food/by/"+userId);
      // const response = await request.json();
      // console.log(response);
      let result = await axios({
        method: "get",
        url: "http://localhost:3002/food/by/" + userId,
        headers: {
          authorization: cookies.get("ka_token"),
        },
      });
      console.log(result, "check1");
      setChefFoods(result.data.items);
    }
    fetchFoodForChefs();
  }, []);

  return (
    <div>
      <NavBar />
      <br />
      <div className="row" style={{ marginLeft: "10px" }}>
        <div className="col-md-4">
          <div
            className="card text-white bg-success mb-3"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-header">Dishes</div>
            <div className="card-body">
              <h5 className="card-title">Total Dishes : {foods?.length}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ marginLeft: "10px" }}>
        {foods.map((food) => (
          <div key={food.id} className="col-md-4">
            <FoodCard {...food} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
