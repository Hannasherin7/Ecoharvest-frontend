import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavAdmin from "../../Components/Layout/NavAdmin";

export const Product = () => {
  const [data, changeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = () => {
    axios
      .get("http://localhost:7000/viewallpro")
      .then((response) => {
        changeData(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message); // Display the error message
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteProduct = (productId) => {
    axios
      .post("http://localhost:7000/deleteprobyadmin", { id: productId }) // Send `id` instead of `productId`
      .then((response) => {
        if (response.data.status === "success") {
          alert("Product deleted successfully!");
          // Refresh the product list after deletion
          fetchData();
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
        alert("An error occurred while deleting the product.");
      });
  };

  const filteredProducts = data.filter((value) =>
    value.pname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Styles
  const pageStyle = {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  };

  const headerStyle = {
    textAlign: "center",
    margin: "20px 0",
    fontSize: "32px",
    color: "#333",
  };

  const searchInputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "300px",
    marginBottom: "20px",
  };

  const cardContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  };

  const cardImageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
  };

  const cardTextStyle = {
    fontSize: "16px",
    color: "#333",
    margin: "10px 0",
  };

  const deleteButtonStyle = {
    padding: "10px 20px",
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  };

  return (
    <div style={pageStyle}>
      {/* Header */}
      <NavAdmin />

      {/* Page Title */}
      <h1 style={headerStyle}>Product Details</h1>

      {/* Search Bar */}
      <div style={{ textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
      </div>

      {/* Product Cards */}
      <div style={cardContainerStyle}>
        {filteredProducts.map((value, index) => (
          <div key={index} style={cardStyle}>
            <img
              src={`http://localhost:7000/${value.image.replace(/^\//, "")}`}
              alt={value.pname}
              style={cardImageStyle}
            />
            <div>
              <p style={cardTextStyle}>Product Name: {value.pname}</p>
              <p style={cardTextStyle}>Seller Email: {value.userId?.email}</p>
              <p style={cardTextStyle}>Seller Name: {value.userId?.name}</p>
              <p style={cardTextStyle}>Description: {value.discription}</p>
              <p style={cardTextStyle}>Price: ${value.price}</p>
              <button
                onClick={() => handleDeleteProduct(value._id)}
                style={deleteButtonStyle}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};