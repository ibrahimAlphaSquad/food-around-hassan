import React, {useState,useEffect} from 'react';
import Spinner from '../Spinner/Spinner';
import {Link} from 'react-router-dom'

export default function AllFoods() {
const [dishes, setDishes] = useState(null);
const [cart, setCart] = useState([]);
    useEffect(() => {
        async function fetchAllDishes() {
          const url = `http://localhost:3002/food/find`;
          const request = await fetch(url);
          const response = await request.json();
          console.log(response);
          setDishes(response);
        }
        fetchAllDishes();
      }, []);

      function addDishHandler(dish) {
        const data = {
          chefID: dish.chef,
          chefName: dish.chefName,
          foodID: dish._id,
          foodName: dish.name,
          foodPrice: dish.price,
          added: true,
        };
        const newArray = [...cart, data];
        setCart(newArray);
      }

      function removeDishHandler(id) {
        const newArray = cart.filter((el) => el.foodID !== id);
        setCart(newArray, cartInCookieHandler());
      }

      function cartInCookieHandler() {
        console.log("Cart is ", cart);
        const str = JSON.stringify(cart);
        window.localStorage.setItem("cart", str);
      }

    return (
        <div>
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
                    {dishes.map((dish) => (
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
                          Lorem, deren, trataro, filede, nerada
                        </div>
                        <div className="menu-ingredients">
                          {cart.find((el) => el.foodID === dish._id) ? (
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
                  <button type="button" class="btn btn-primary mt-5">
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
    )
}
