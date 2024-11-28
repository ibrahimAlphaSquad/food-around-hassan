import React, { useState } from "react";
import EditFood from "./EditFood";

function FoodCard({
  _id,
  name,
  description,
  price,
  chef,
  chefName,
  featured,
  image,
  rating,
}) {
  const [showEditModal, setShowEditModal] = useState(false);

  const styles = {
    card: {
      backgroundColor: "white",
      borderRadius: "8px",
      overflow: "hidden",
      marginBottom: "20px",
      border: "1px solid #eee",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    image: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderBottom: "1px solid #eee",
    },
    contentWrapper: {
      padding: "20px",
    },
    title: {
      color: "#333",
      fontSize: "20px",
      fontWeight: "500",
      marginBottom: "15px",
      display: "flex",
      alignItems: "center",
    },
    priceText: {
      color: "#be9656",
      fontSize: "16px",
      marginBottom: "10px",
      display: "flex",
      alignItems: "center",
    },
    descriptionText: {
      color: "#666",
      fontSize: "14px",
      marginBottom: "15px",
      lineHeight: "1.4",
      display: "flex",
      alignItems: "baseline",
    },
    label: {
      color: "#444",
      fontWeight: "600",
      minWidth: "100px",
      marginRight: "8px",
    },
    value: {
      flex: 1,
    },
    buttonContainer: {
      display: "flex",
      gap: "10px",
      marginTop: "20px",
    },
    editButton: {
      flex: 1,
      padding: "10px 15px",
      backgroundColor: "#0d6efd",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      fontSize: "14px",
      fontWeight: "500",
    },
    deleteButton: {
      flex: 1,
      padding: "10px 15px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      fontSize: "14px",
      fontWeight: "500",
    },
  };

  async function deleteHandler() {
    try {
      if (window.confirm("Are you sure you want to delete this item?")) {
        const response = await fetch("http://localhost:3002/food/delete", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ foodId: _id }),
        });

        if (!response.ok) {
          throw new Error("Failed to delete item");
        }

        const data = await response.json();
        console.log("Delete successful:", data);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again.");
    }
  }

  return (
    <>
      <div style={styles.card}>
        <img
          src={
            image ||
            require("../../assets/img/menu/lobster-bisque.jpg")
          }
          style={styles.image}
          alt={name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = require("../../assets/img/menu/lobster-bisque.jpg");
          }}
        />
        <div style={styles.contentWrapper}>
          <div style={styles.title}>
            <span style={styles.label}>TITLE:</span>
            <span style={styles.value}>{name}</span>
          </div>
          <div style={styles.priceText}>
            <span style={styles.label}>PRICE:</span>
            <span style={styles.value}>{price}</span>
          </div>
          <div style={styles.descriptionText}>
            <span style={styles.label}>DESCRIPTION:</span>
            <span style={styles.value}>{description}</span>
          </div>

          <div style={styles.buttonContainer}>
            <button
              style={styles.editButton}
              onClick={() => setShowEditModal(true)}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0b5ed7")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#0d6efd")}
            >
              Edit
            </button>
            <button
              style={styles.deleteButton}
              onClick={deleteHandler}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#bb2d3b")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
            >
              DELETE
            </button>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditFood
          id={_id}
          name={name}
          description={description}
          price={price}
          chef={chef}
          chefName={chefName}
          featured={featured}
          image={image}
          rating={rating}
          setShowEditModal={setShowEditModal}
        />
      )}
    </>
  );
}

export default FoodCard;