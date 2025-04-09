import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../Components/Layout/NavBar";
import { Link, useNavigate } from "react-router-dom";
import NavSeller from "../../Components/Layout/NavSeller";
import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

           

const SoldProducts = () => {
  const [soldProducts, setSoldProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // For search functionality
  const [error, setError] = useState("");
  const [editingProductId, setEditingProductId] = useState(null); // Track which product is being edited
  const [editedProduct, setEditedProduct] = useState({}); // Store edited product data
  const [searchQuery, setSearchQuery] = useState(""); // For search input
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSoldProducts = async () => {
      const userId = localStorage.getItem("userid");
      console.log("Retrieved user ID from localStorage:", userId);

      if (!userId) {
        setError("User ID not found. Please log in again.");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:7000/soldproduct?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("API Response:", response.data);

        if (!response.data || response.data.length === 0) {
          setError("No sold products found for this user.");
          return;
        }

        setSoldProducts(response.data);
        setFilteredProducts(response.data); // Initialize filtered products with all products
      } catch (err) {
        console.error(
          "Error fetching sold products:",
          err.message || err.response
        );
        setError("Could not fetch sold products. Please try again later.");
      }
    };

    fetchSoldProducts();
  }, []);

  // Function to handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/deleteprobyadmin",
        { id: productId }
      );
      if (response.data.status === "success") {
        alert("Product deleted successfully!");
        const updatedProducts = soldProducts.filter(
          (product) => product._id !== productId
        );
        setSoldProducts(updatedProducts);
        setFilteredProducts(updatedProducts); // Update filtered products as well
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    }
  };

  // Function to handle editing a product
  const handleEditProduct = (productId) => {
    setEditingProductId(productId);
    const productToEdit = soldProducts.find(
      (product) => product._id === productId
    );
    setEditedProduct({ ...productToEdit });
  };

  // Function to handle saving the edited product
  const handleSaveProduct = async (productId) => {
    try {
      const response = await axios.put(
        `http://localhost:7000/updateproduct/${productId}`,
        editedProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.status === "success") {
        alert("Product updated successfully!");
        const updatedProducts = soldProducts.map((product) =>
          product._id === productId ? { ...product, ...editedProduct } : product
        );
        setSoldProducts(updatedProducts);
        setFilteredProducts(updatedProducts); // Update filtered products as well
        setEditingProductId(null); // Stop editing
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update the product.");
    }
  };

  // Function to handle canceling the edit
  const handleCancelEdit = () => {
    setEditingProductId(null);
  };

  // Function to handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  // Function to handle changes in delivery zones
  const handleDeliveryZonesChange = (e) => {
    const { value } = e.target;
    const zones = value.split(",").map((zone) => zone.trim());
    setEditedProduct({ ...editedProduct, deliveryZones: zones });
  };

  // Function to handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter products based on the search query
    const filtered = soldProducts.filter((product) =>
      product.pname.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const headerStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    textAlign: "center",
    padding: "20px",
    borderRadius: "10px",
    margin: "20px 0",
    width: "100%", // Ensure header spans full width
  };

  const footerStyle = {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "20px",
    marginTop: "auto",
    width: "100%", // Ensure footer spans full width
  };

  const linkStyle = {
    color: "#4caf50",
    textDecoration: "none",
  };

  return (
    <div style={styles.pageStyle}>
      <NavSeller />

      <h1 style={headerStyle}>Sold Products</h1>
      {error && <p style={styles.error}>{error}</p>}

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
      </div>

      {filteredProducts.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Product Name</th>
              <th style={styles.th}>Product Type</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Special Offers</th>
              <th style={styles.th}>Discount Percentage</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Quantity Sold</th>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Feedbacks</th>
              <th style={styles.th}>Delivery Zones</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td style={styles.td}>
                  {editingProductId === product._id ? (
                    <input
                      type="text"
                      name="pname"
                      value={editedProduct.pname}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.pname
                  )}
                </td>
                <td style={styles.td}>
                  {editingProductId === product._id ? (
                    <input
                      type="text"
                      name="productype"
                      value={editedProduct.productype}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.productype
                  )}
                </td>
                <td style={styles.td}>
                  {editingProductId === product._id ? (
                    <input
                      type="text"
                      name="discription"
                      value={editedProduct.discription}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.discription
                  )}
                </td>
                <td style={styles.td}>
                  {editingProductId === product._id ? (
                    <input
                      type="text"
                      name="specialOffers"
                      value={editedProduct.specialOffers}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.specialOffers
                  )}
                </td>
                <td style={styles.td}>
                  {editingProductId === product._id ? (
                    <input
                      type="number"
                      name="discountPercentage"
                      value={editedProduct.discountPercentage}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.discountPercentage
                  )}
                </td>
                <td style={styles.td}>
                  {editingProductId === product._id ? (
                    <input
                      type="number"
                      name="price"
                      value={editedProduct.price}
                      onChange={handleInputChange}
                    />
                  ) : (
                    `$${product.price}`
                  )}
                </td>
                <td style={styles.td}>
                  {editingProductId === product._id ? (
                    <input
                      type="number"
                      name="quantity"
                      value={editedProduct.quantity}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.quantity
                  )}
                </td>
                <td style={styles.td}>
                  <img
                    src={`http://localhost:7000/${product.image.replace(
                      /^\//,
                      ""
                    )}`}
                    alt={product.pname}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td style={styles.td}>
                  {editingProductId === product._id ? (
                    <input
                      type="text"
                      name="feedbacks"
                      value={editedProduct.feedbacks}
                      onChange={handleInputChange}
                    />
                  ) : // Check if feedbacks exist and are not empty
                  product.feedbacks && product.feedbacks.length > 0 ? (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {product.feedbacks.map((feedback, index) => (
                        <li key={index} style={{ marginBottom: "10px" }}>
                          <strong>{feedback.userId?.name || "Anonymous"}:</strong>{" "}
                          {feedback.text} (Rating: {feedback.rating})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No feedbacks yet" // Display this message if there are no feedbacks
                  )}
                </td>
                <td style={styles.td}>
                  {editingProductId === product._id ? (
                    <input
                      type="text"
                      name="deliveryZones"
                      value={editedProduct.deliveryZones?.join(", ") || ""}
                      onChange={handleDeliveryZonesChange}
                      placeholder="Enter postal codes separated by commas"
                    />
                  ) : (
                    product.deliveryZones?.join(", ") || "No delivery zones"
                  )}
                </td>
                <td style={styles.td}>
                  {editingProductId === product._id ? (
                    <div>
                      <button
                        onClick={() => handleSaveProduct(product._id)}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#4caf50",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginRight: "5px",
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#ff4d4d",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#ff4d4d",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginBottom: "5px",
                        }}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEditProduct(product._id)}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#4caf50",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>No products found matching your search.</p>
      )}
     
                 <footer style={{
                 backgroundColor: "#2c3e50",
                 color: "#ecf0f1",
                 padding: "50px 0 20px",
                 marginTop: "50px"
               }}>
                 <div className="container">
                   <div className="row">
                     <div className="col-md-4 mb-4">
                       <h5 style={{ 
                         fontFamily: "'Playfair Display', serif",
                         marginBottom: "20px",
                         fontWeight: "600"
                       }}>
                         EcoHarvest
                       </h5>
                       <p style={{ lineHeight: "1.6" }}>
                         Bringing people together through the joy of organic living and sharing high-quality products from around the world.
                       </p>
                     </div>
                     <div className="col-md-2 mb-4">
                       <h6 style={{ fontWeight: "600", marginBottom: "15px" }}>Explore</h6>
                       <ul style={{ listStyle: "none", padding: "0" }}>
                         <li style={{ marginBottom: "8px" }}><Link to="/" style={{ color: "#bdc3c7", textDecoration: "none", ":hover": { color: "#fff" } }}>Home</Link></li>
                         <li style={{ marginBottom: "8px" }}><Link to="/productlist" style={{ color: "#bdc3c7", textDecoration: "none", ":hover": { color: "#fff" } }}>Products</Link></li>
                         <li style={{ marginBottom: "8px" }}><Link to="/about" style={{ color: "#bdc3c7", textDecoration: "none", ":hover": { color: "#fff" } }}>About</Link></li>
                         <li style={{ marginBottom: "8px" }}><Link to="/contact" style={{ color: "#bdc3c7", textDecoration: "none", ":hover": { color: "#fff" } }}>Contact</Link></li>
                       </ul>
                     </div>
                     <div className="col-md-3 mb-4">
                       <h6 style={{ fontWeight: "600", marginBottom: "15px" }}>Legal</h6>
                       <ul style={{ listStyle: "none", padding: "0" }}>
                         <li style={{ marginBottom: "8px" }}>Eco-friendly Commitment</li>
                         <li style={{ marginBottom: "8px" }}>Sustainability Policy</li>
                         <li style={{ marginBottom: "8px" }}>Organic Certification</li>
                       </ul>
                     </div>
                     <div className="col-md-3 mb-4">
                       <h6 style={{ fontWeight: "600", marginBottom: "15px" }}>Connect With Us</h6>
                       <div className="social-icons" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                         <a href="https://facebook.com" style={{ color: "#bdc3c7", marginRight: "15px", ":hover": { color: "#3b5998" } }}><FaFacebook /></a>
                         <a href="https://instagram.com" style={{ color: "#bdc3c7", marginRight: "15px", ":hover": { color: "#e4405f" } }}><FaInstagram /></a>
                         <a href="https://twitter.com" style={{ color: "#bdc3c7", ":hover": { color: "#1da1f2" } }}><FaTwitter /></a>
                       </div>
                      
                       
                     </div>
                   </div>
                   <hr style={{ borderColor: "#34495e", margin: "20px 0" }} />
                   <div className="text-center" style={{ fontSize: "0.9rem" }}>
                     <p style={{ margin: "0" }}>
                       &copy; {new Date().getFullYear()} EcoHarvest. All rights reserved.
                     </p>
                   </div>
                 </div>
               </footer>
    </div>
  );
};

const styles = {
  pageStyle: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    margin: "20px 0",
    textAlign: "center",
  },
  searchInput: {
    width: "300px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    border: "2px solid black",
  },
  th: {
    border: "2px solid black",
    padding: "10px",
    backgroundColor: "#ddd",
    textAlign: "center",
  },
  td: {
    border: "1px solid black",
    padding: "10px",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
};

export default SoldProducts;