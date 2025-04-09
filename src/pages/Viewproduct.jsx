import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for footer navigation
import NavBar from "../Components/Layout/NavBar";

export const Viewproduct = () => {
  const [data, changeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = () => {
    axios
      .get("http://localhost:7000/viewpro", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
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

  const filteredProducts = data.filter((value) =>
    value.pname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle product deletion
  const handleDelete = (productId) => {
    axios
      .post(
        "http://localhost:7000/deletepro",
        { id: productId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        console.log("Backend Response:", response.data); // Log the backend response
        if (response.data.status === "success") {
          alert("Product deleted successfully!");
          fetchData(); // Refresh the product list after deletion
        } else {
          alert("Failed to delete product. Backend response: " + response.data.message);
        }
      })
      .catch((error) => {
        console.log("Error deleting product:", error.message);
        alert("An error occurred while deleting the product.");
      });
  };

  // Styles
  const headerStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    textAlign: "center",
    padding: "20px",
    borderRadius: "10px",
    margin: "20px 0",
  };

  const footerStyle = {
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    padding: "20px",
    marginTop: "auto",
    width: "100%",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    margin: "0 5px",
  };

  const pageStyle = {
    padding: "20px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Glass effect background
    backdropFilter: "blur(10px)", // Blur effect
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
  };

  const deleteButtonStyle = {
    padding: "5px 10px",
    backgroundColor: "#ff4d4d", // Red color for delete button
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  };

  return (
    <div style={pageStyle}>
      <NavBar />
      <h1 style={headerStyle}>View All Products</h1>{" "}
      {/* Header with headerStyle applied */}
      {/* Search Bar */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "300px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "white",
          }}
        />
      </div>
      {/* Product Cards */}
      <div className="container">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="row g-3">
              {filteredProducts.map((value, index) => (
                <div
                  className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3"
                  key={index}
                >
                  <div className="card" style={cardStyle}>
                    <img
                      src={value.image}
                      alt={value.pname}
                      style={{ width: "100%", borderRadius: "10px" }}
                    />
                    <div className="card-body">
                      <p className="card-text">Product Name: {value.pname}</p>
                      <p className="card-text">
                        Product Description: {value.pdescription}
                      </p>
                      <p className="card-text">Price: {value.price}</p>
                      {/* Delete Button */}
                      <button
                        style={deleteButtonStyle}
                        onClick={() => handleDelete(value._id)} // Assuming _id is the product ID
                      >
                        Delete Product
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};