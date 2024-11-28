import React, { useState } from "react";

function EditFood({
  id,
  name,
  description,
  price,
  chef,
  chefName,
  featured,
  image,
  rating,
  setShowEditModal,
}) {
  const [changedDescription, setChangedDescription] = useState("");
  const [changedDishName, setChangedDishName] = useState("");
  const [changedPrice, setChangedPrice] = useState("");
  const [changedImage, setChangedImage] = useState("");

  const styles = {
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modalDialog: {
      width: "100%",
      maxWidth: "500px",
      margin: "20px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    },
    modalContent: {
      padding: "20px",
    },
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px",
      borderBottom: "1px solid #eee",
    },
    title: {
      margin: 0,
      fontSize: "24px",
      fontWeight: "600",
      color: "#333",
    },
    closeButton: {
      background: "none",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
      color: "#666",
      padding: "0 10px",
    },
    inputGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      color: "#666",
      fontSize: "14px",
      fontWeight: "500",
      textTransform: "uppercase",
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "16px",
      transition: "border-color 0.3s",
      outline: "none",
    },
    updateButton: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.3s",
      marginTop: "10px",
    },
    preview: {
      width: "100%",
      height: "200px",
      marginTop: "10px",
      borderRadius: "4px",
      objectFit: "cover",
      display: "block",
      backgroundColor: "#f8f9fa",
    },
  };

  const handleClose = (e) => {
    e.preventDefault();
    setShowEditModal(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowEditModal(false);
    }
  };

  async function editHandler(e) {
    e.preventDefault();

    const updates = {
      foodId: id,
      chef,
      chefName,
      featured: false,
      image: changedImage || image,
      rating: 10,
      name: changedDishName || name,
      description: changedDescription || description,
      price: changedPrice || price,
    };

    try {
      const response = await fetch("http://localhost:3002/food/edit", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updates }),
      });

      if (response.ok) {
        setShowEditModal(false);
        window.location.reload();
      } else {
        throw new Error("Failed to update food item");
      }
    } catch (error) {
      console.error("Error updating food:", error);
      // Could add error handling UI here
    }
  }

  return (
    <div style={styles.modalOverlay} onClick={handleOverlayClick}>
      <div style={styles.modalDialog} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h3 style={styles.title}>EDIT FISH</h3>
          <button
            style={styles.closeButton}
            onClick={handleClose}
            onMouseOver={(e) => (e.target.style.color = "#000")}
            onMouseOut={(e) => (e.target.style.color = "#666")}
          >
            ×
          </button>
        </div>

        <form onSubmit={editHandler} style={styles.modalContent}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>YOUR DISH NAME</label>
            <input
              style={styles.input}
              type="text"
              placeholder={name}
              defaultValue={name}
              onChange={(e) => setChangedDishName(e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#28a745")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>YOUR DESCRIPTION</label>
            <input
              style={styles.input}
              type="text"
              placeholder={description}
              defaultValue={description}
              onChange={(e) => setChangedDescription(e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#28a745")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>PRICE</label>
            <input
              style={styles.input}
              type="number"
              placeholder={price}
              defaultValue={price}
              onChange={(e) => setChangedPrice(e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#28a745")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>IMAGE URL</label>
            <input
              style={styles.input}
              type="text"
              placeholder="Enter image URL"
              defaultValue={image}
              onChange={(e) => setChangedImage(e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#28a745")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
            {(changedImage || image) && (
              <img
                src={changedImage || image}
                alt={name}
                style={styles.preview}
                onError={(e) => {
                  e.target.src = require("../../assets/img/menu/lobster-bisque.jpg");
                }}
              />
            )}
          </div>

          <button
            type="submit"
            style={styles.updateButton}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#218838";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#28a745";
            }}
          >
            Update Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditFood;
