import React, { useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
import UserNavbar from "../Navbar/UserNavbar";

const cookies = new Cookies();
const orderedBy = cookies.get("userId");

function Menu() {
  const [dishes, setDishes] = useState(null);
  const [cart, setCart] = useState(!window.localStorage.getItem('cart') ? {itemsOrdered: [], amount: 0, orderedBy} : JSON.parse(window.localStorage.getItem('cart')));
  const path = window.location.pathname.split("/");
  const slug = path[2];

  useEffect(() => {
    async function fetchChefDishes() {
      const url = `http://localhost:3002/food/by/${slug}`;
      const request = await fetch(url);
      const response = await request.json();
      console.log(response);
      setDishes(response);
    }
    fetchChefDishes();
  }, []);

  useEffect(() => {
    if (cart[`itemsOrdered`].length !== 0) {
      cartInCookieHandler();
    }
  }, [cart]);

  function addDishHandler(dish) {
    const foodItem = {
      chefID: dish.chef,
      chefName: dish.chefName,
      foodID: dish._id,
      foodName: dish.name,
      foodPrice: dish.price,
      quantity: 1,
      added: true,
    };
    
    let itemsOrdered = cart[`itemsOrdered`];
    itemsOrdered.push(foodItem);

    let orderedBy = cookies.get("userId");

    let amount = Number(foodItem.foodPrice) + Number(cart.amount);
    let updatedCart = {...cart, itemsOrdered};
    updatedCart.orderedBy = orderedBy;
    updatedCart.amount = amount;

    setCart(updatedCart);
  }

  function removeDishHandler(id) {

    console.log(`Removing item: ${id}`)
    let amount = cart.amount;
    const itemsOrdered = cart[`itemsOrdered`].filter((el) => {
      if(el.foodID === id) {
        amount = amount - Number(el.foodPrice);
        console.log(`item found: ${id}`)
        return false;
      } else {

        return true;
      }
    });

    let updatedCart = {...cart, itemsOrdered};
    //updatedCart.itemsOrdered = itemsOrdered;
    updatedCart.amount = amount;
    setCart(updatedCart);
  }

  function cartInCookieHandler() {
    
    const str = JSON.stringify(cart);
    window.localStorage.setItem("cart", str);
  }

  return (

    <div>
      <UserNavbar />
      <section
        id="menu"
        className="menu section-bg"
        style={{ minHeight: "100vh" }}
      >
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Menu</h2>
            <p>Check Our Tasty Menu</p>
          </div>
          <>
            {dishes ? (
              <>
                <div
                  className="row menu-container"
                  data-aos="fade-up"
                  data-aos-delay={200}
                >
                  {/* //////////////////////////////////////////////////////////////////////// */}
                  {dishes.items.map((dish) => (
                    <div className="col-lg-6 menu-item" key={dish._id}>
                      <img
                        src={require("../../assets/img/menu/lobster-bisque.jpg")}
                        className="menu-img"
                        alt={dish.name}
                      />
                      <div className="menu-content">
                        <a href="#">{dish.name}</a>
                        <span>Pkr {dish.price}</span>
                      </div>
                      <div className="menu-ingredients">
                        {dish.description}
                      </div>
                      <div className="menu-ingredients">
                        {cart.itemsOrdered.find((el) => el.foodID === dish._id) ? (
                          <button
                            style={{
                              background: "transparent",
                              color: "#CDA45E",
                              border: "none",
                              marginLeft: "-5px",
                            }}
                            onClick={() => removeDishHandler(dish._id)}
                          >
                            Remove From Cart
                          </button>
                        ) : (
                          <button
                            style={{
                              background: "transparent",
                              color: "#CDA45E",
                              border: "none",
                              marginLeft: "-5px",
                            }}
                            onClick={() => addDishHandler(dish)}
                          >
                            Add To Cart
                          </button>
                        )}
                      </div>
                      
                    </div>
                  ))}

                  {/* //////////////////////////////////////////////////////////////////////// */}
                </div>{" "}
                <Link to = '/cart'>
                <button type="button" className="btn btn-primary mt-5">
                Check Your Cart
                </button>
                </Link>
              </>
            ) : (
              <Spinner />
            )}
          </>
        </div>
      </section>
    </div>
  );
}

export default Menu;

const singleItem = () => {
  return (
    <div className="col-lg-6 menu-item filter-starters">
      <img
        src={require("../../assets/img/menu/lobster-bisque.jpg")}
        className="menu-img"
        alt="e"
      />
      <div className="menu-content">
        <a href="#">Lobster Bisque</a>
        <span>$5.95</span>
      </div>
      <div className="menu-ingredients">
        Lorem, deren, trataro, filede, nerada
      </div>
    </div>
  );
};
