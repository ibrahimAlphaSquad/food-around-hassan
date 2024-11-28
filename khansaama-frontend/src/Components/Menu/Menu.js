import React, { useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import UserNavbar from "../Navbar/UserNavbar";

const cookies = new Cookies();

function Menu() {
  const [dishes, setDishes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const orderedBy = cookies.get("userId");

  const [cart, setCart] = useState(() => {
    const savedCart = window.localStorage.getItem("cart");
    return savedCart
      ? JSON.parse(savedCart)
      : {
          itemsOrdered: [],
          amount: 0,
          orderedBy,
        };
  });

  const path = window.location.pathname.split("/");
  const slug = path[2];

  useEffect(() => {
    const fetchChefDishes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url = `http://localhost:3002/food/by/${slug}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch menu items");
        const data = await response.json();
        setDishes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChefDishes();
  }, [slug]);

  useEffect(() => {
    if (cart.itemsOrdered.length !== 0) {
      window.localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const styles = {
    pageContainer: {
      backgroundColor: "#1a1814",
      minHeight: "100vh",
      color: "white",
    },
    titleSection: {
      textAlign: "center",
      padding: "40px 0 20px",
      color: "white",
    },
    titleText: {
      fontSize: "32px",
      fontWeight: "600",
      marginBottom: "20px",
    },
    menuContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
    },
    menuGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "30px",
      padding: "20px 0",
    },
    menuCard: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    menuImage: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: "6px",
      marginBottom: "15px",
    },
    dishName: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#333",
      marginBottom: "10px",
    },
    dishPrice: {
      color: "#cda45e",
      fontSize: "18px",
      fontWeight: "600",
    },
    dishDescription: {
      color: "#666",
      fontSize: "14px",
      marginBottom: "15px",
    },
    actionButton: {
      width: "100%",
      padding: "8px",
      border: "none",
      borderRadius: "4px",
      backgroundColor: "#cda45e",
      color: "white",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background-color 0.3s",
    },
    removeButton: {
      backgroundColor: "transparent",
      border: "1px solid #cda45e",
      color: "#cda45e",
    },
    cartSummary: {
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#cda45e",
      padding: "15px 25px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      gap: "20px",
      color: "white",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    viewCartButton: {
      backgroundColor: "white",
      color: "#cda45e",
      padding: "8px 20px",
      borderRadius: "4px",
      textDecoration: "none",
      fontWeight: "600",
    },
  };

  const addDishHandler = (dish) => {
    const foodItem = {
      chefID: dish.chef,
      chefName: dish.chefName,
      foodID: dish._id,
      foodName: dish.name,
      foodPrice: dish.price,
      quantity: 1,
      added: true,
    };

    setCart((prevCart) => ({
      itemsOrdered: [...prevCart.itemsOrdered, foodItem],
      orderedBy,
      amount: Number(foodItem.foodPrice) + Number(prevCart.amount),
    }));
  };

  const removeDishHandler = (id) => {
    setCart((prevCart) => {
      const removedItem = prevCart.itemsOrdered.find(
        (item) => item.foodID === id
      );
      return {
        itemsOrdered: prevCart.itemsOrdered.filter(
          (item) => item.foodID !== id
        ),
        orderedBy,
        amount: prevCart.amount - Number(removedItem?.foodPrice || 0),
      };
    });
  };

  if (isLoading)
    return (
      <div style={styles.pageContainer}>
        <Spinner />
      </div>
    );
  if (error) return <div style={styles.pageContainer}>Error: {error}</div>;

  return (
    <div style={styles.pageContainer}>
      <UserNavbar />

      <div style={styles.titleSection}>
        <h2 style={styles.titleText}>CHECK OUR TASTY MENU</h2>
      </div>

      <div style={styles.menuContainer}>
        <div style={styles.menuGrid}>
          {dishes?.items.map((dish) => (
            <div key={dish._id} style={styles.menuCard}>
              <img
                src={
                  dish.image ||
                  require("../../assets/img/menu/lobster-bisque.jpg")
                }
                style={styles.menuImage}
                alt={dish.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = require("../../assets/img/menu/lobster-bisque.jpg");
                }}
              />
              <div style={styles.dishName}>{dish.name}</div>
              <div style={styles.dishPrice}>PKR {dish.price}</div>
              <div style={styles.dishDescription}>{dish.description}</div>

              {cart.itemsOrdered.find((el) => el.foodID === dish._id) ? (
                <button
                  style={{ ...styles.actionButton, ...styles.removeButton }}
                  onClick={() => removeDishHandler(dish._id)}
                >
                  Remove From Cart
                </button>
              ) : (
                <button
                  style={styles.actionButton}
                  onClick={() => addDishHandler(dish)}
                >
                  Add To Cart
                </button>
              )}
            </div>
          ))}
        </div>

        {cart.itemsOrdered.length > 0 && (
          <div style={styles.cartSummary}>
            <span>
              TOTAL ITEMS: {cart.itemsOrdered.length} | AMOUNT: PKR{" "}
              {cart.amount}
            </span>
            <Link to="/cart" style={styles.viewCartButton}>
              VIEW CART
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
