import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import NavBar from "../Navbar/ChefNavbar";

const cookies = new Cookies();

function AddFood(props) {
  const [name, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setFoodPrice] = useState("");

  const styles = {
    container: {
      backgroundColor: "#1a1814",
      minHeight: "100vh",
      color: "white",
    },
    formContainer: {
      maxWidth: "500px",
      margin: "0 auto",
      padding: "40px 20px",
    },
    title: {
      color: "#cda45e",
      textAlign: "center",
      fontSize: "32px",
      marginBottom: "40px",
      fontWeight: "600",
    },
    inputGroup: {
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "12px",
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "4px",
      color: "white",
      fontSize: "16px",
      transition: "border-color 0.3s",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#cda45e",
      border: "none",
      borderRadius: "4px",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      marginTop: "20px",
    },
  };

  useEffect(() => {
    const token = cookies.get("ka_token");
    if (!token) {
      props.history.push("/login");
    }
  }, [props.history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = cookies.get("ka_token");
      const itemInfo = {
        name,
        description,
        image,
        price,
      };

      const response = await fetch("http://localhost:3002/food/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(itemInfo),
      });

      const data = await response.json();

      if (response.ok) {
        // Clear form
        setFoodName("");
        setDescription("");
        setImage("");
        setFoodPrice("");
        // Could add success message here
      } else {
        throw new Error(data.message || "Failed to add item");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      // Could add error message here
    }
  };

  return (
    <div style={styles.container}>
      <NavBar />
      <div style={styles.formContainer}>
        <h1 style={styles.title}>ADD ITEM</h1>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <input
              style={styles.input}
              type="text"
              placeholder="Item Name"
              value={name}
              onChange={(e) => setFoodName(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              style={styles.input}
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              style={styles.input}
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              style={styles.input}
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setFoodPrice(e.target.value)}
              required
			  min={1}
            />
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#d4b36b";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#cda45e";
            }}
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddFood;
