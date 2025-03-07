import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../Components/Layout/NavBar';
import { Link, useNavigate } from 'react-router-dom';

const SoldProducts = () => {
  const [soldProducts, setSoldProducts] = useState([]);
  const [error, setError] = useState('');
  const [editingProductId, setEditingProductId] = useState(null); // Track which product is being edited
  const [editedProduct, setEditedProduct] = useState({}); // Store edited product data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSoldProducts = async () => {
      const userId = localStorage.getItem('userid');
      console.log("Retrieved user ID from localStorage:", userId);

      if (!userId) {
        setError("User ID not found. Please log in again.");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:7000/soldproduct?userId=${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log("API Response:", response.data);

        if (!response.data || response.data.length === 0) {
          setError("No sold products found for this user.");
          return;
        }

        setSoldProducts(response.data);
      } catch (err) {
        console.error("Error fetching sold products:", err.message || err.response);
        setError("Could not fetch sold products. Please try again later.");
      }
    };

    fetchSoldProducts();
  }, []);

  // Function to handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.post("http://localhost:7000/deleteprobyadmin", { id: productId });
      if (response.data.status === "success") {
        alert("Product deleted successfully!");
        setSoldProducts(soldProducts.filter(product => product._id !== productId));
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
    const productToEdit = soldProducts.find(product => product._id === productId);
    setEditedProduct({ ...productToEdit });
  };

  // Function to handle saving the edited product
  const handleSaveProduct = async (productId) => {
    try {
      const response = await axios.put(`http://localhost:7000/updateproduct/${productId}`, editedProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

      if (response.data.status === "success") {
        alert("Product updated successfully!");
        const updatedProducts = soldProducts.map(product =>
          product._id === productId ? { ...product, ...editedProduct } : product
        );
        setSoldProducts(updatedProducts);
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
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
    marginTop: 'auto',
    width: '100%', // Ensure footer spans full width
  };

  const linkStyle = {
    color: '#4caf50',
    textDecoration: 'none',
  };

  return (
    <div style={styles.pageStyle}>
      <NavBar />

      <h1 style={headerStyle}>Sold Products</h1>
      {error && <p style={styles.error}>{error}</p>}

      {soldProducts.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Product Name</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Quantity Sold</th>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {soldProducts.map((product) => (
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
                    src={`http://localhost:7000/${product.image.replace(/^\//, "")}`}
                    alt={product.pname}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                </td>
                <td style={styles.td}>
                  {editingProductId === product._id ? (
                    <div>
                      <button
                        onClick={() => handleSaveProduct(product._id)}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#4caf50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          marginRight: '5px',
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#ff4d4d',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
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
                          padding: '5px 10px',
                          backgroundColor: '#ff4d4d',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          marginBottom: '5px',
                        }}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEditProduct(product._id)}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#4caf50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
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
        !error && <p>Loading sold products...</p>
      )}
      <footer style={footerStyle}>
        <p>&copy; 2025 EcoHarvest. All rights reserved.</p>
        <p>
          Follow us on
          <a href="https://facebook.com" style={linkStyle}> Facebook</a>,
          <a href="https://instagram.com" style={linkStyle}> Instagram</a>, and
          <a href="https://twitter.com" style={linkStyle}> Twitter</a>.
        </p>
        <p>
          <Link to="/contact" style={linkStyle}>Contact Us</Link> |
          <Link to="/about" style={linkStyle}> About Us</Link>
        </p>
      </footer>
    </div>
  );
};

const styles = {
  pageStyle: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    border: '2px solid black',
  },
  th: {
    border: '2px solid black',
    padding: '10px',
    backgroundColor: '#ddd',
    textAlign: 'center',
  },
  td: {
    border: '1px solid black',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
};

export default SoldProducts;