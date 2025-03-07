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
  const headerStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    textAlign: "center",
    padding: "20px",
    borderRadius: "10px",
    margin: "20px 0",
  };

  const footerStyle = {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "20px",
    marginTop: "30px",
  };

  const linkStyle = {
    color: "#4caf50",
    textDecoration: "none",
  };

  const pageStyle = {
    backgroundImage:
      "url('https://wallpapers.com/images/hd/aesthetic-astronaut-flower-field-laptop-4ndqwiauwee5jpze.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    padding: "20px",
    color: "white",
  };

  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Glass effect background
    backdropFilter: "blur(10px)", // Blur effect
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Glass effect background for button
    backdropFilter: "blur(10px)",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    position: "absolute", // Position it absolutely
    right: "20px", // Move it to the right
    top: "20px", // Adjust the vertical position if needed
  };

  return (
    <div style={pageStyle}>
      <NavAdmin />
      <h1 style={headerStyle}>Product Details</h1>{" "}
      {/* Header with headerStyle applied */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            width: "300px",
          }}
        />
      </div>
     
      <div className="container" style={{ marginTop: "60px" }}>
        {" "}
        {/* Add margin to account for the button position */}
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
                      src={`http://localhost:7000/${value.image.replace(
                        /^\//,
                        ""
                      )}`}
                      alt={value.pname}
                    />
                    <div className="card-body">
                      <p className="card-text">Product Name: {value.pname}</p>
                      <p className="card-text">Seller Email: {value.userId?.email}</p>
                      <p className="card-text">Seller Name: {value.userId?.name}</p>
                      <p className="card-text">
                        Product Description: {value.discription}
                      </p>
                      <p className="card-text">Price: {value.price}</p>
                      {/* Add a delete button */}
                      <button
                        onClick={() => handleDeleteProduct(value._id)}
                        style={{
                          padding: "10px",
                          backgroundColor: "#ff4d4d",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer style={footerStyle}>
        <p>&copy; 2025 EcoHarvest. All rights reserved.</p>
        <p>
          Follow us on
          <a href="https://facebook.com" style={linkStyle}>
            {" "}
            Facebook
          </a>
          ,
          <a href="https://instagram.com" style={linkStyle}>
            {" "}
            Instagram
          </a>
          , and
          <a href="https://twitter.com" style={linkStyle}>
            {" "}
            Twitter
          </a>
          .
        </p>
        <p>
          <Link to="/contact" style={linkStyle}>
            Contact Us
          </Link>{" "}
          |
          <Link to="/about" style={linkStyle}>
            {" "}
            About Us
          </Link>
        </p>
      </footer>
    </div>
  );
};