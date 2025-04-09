import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../Components/Layout/NavBar";
  import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";


const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [orderData, setOrderData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    paymentMethod: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderResults, setOrderResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:7000/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:7000/remove-from-cart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      await axios.put(
        `http://localhost:7000/update-cart/${productId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const increaseQuantity = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const decreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  const handleInputChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const placeAllOrders = async () => {
    if (
      !orderData.name ||
      !orderData.email ||
      !orderData.phone ||
      !orderData.address ||
      !orderData.pincode ||
      !orderData.paymentMethod
    ) {
      alert("Please fill all fields.");
      return;
    }
  
    setIsProcessing(true);
    const results = [];
    let successCount = 0;
  
    try {
      for (const item of cart.items) {
        try {
          const discountedPrice = getDiscountedPrice(
            item.price,
            item.productId.discountPercentage
          );
  
          const orderPayload = {
            ...orderData,
            productId: item.productId._id,
            orderQuantity: item.quantity,
            discountedPrice: discountedPrice * item.quantity, // Include discounted price
            originalPrice: item.price * item.quantity // Optional: include original price for reference
          };
  
          const response = await axios.post(
            "http://localhost:7000/order",
            orderPayload,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
  
          if (response.data.status === "success") {
            successCount++;
            results.push({
              productId: item.productId._id,
              productName: item.productId.pname,
              status: "success",
              message: "Order placed successfully",
            });
            await removeFromCart(item.productId._id);
          } else {
            results.push({
              productId: item.productId._id,
              productName: item.productId.pname,
              status: "error",
              message: response.data.message || "Failed to place order",
            });
          }
        } catch (error) {
          console.error(`Error ordering product ${item.productId._id}:`, error);
          results.push({
            productId: item.productId._id,
            productName: item.productId.pname,
            status: "error",
            message: error.response?.data?.message || "Failed to place order",
          });
        }
      }
  
      setOrderResults(results);
      alert(`${successCount} of ${cart.items.length} items ordered successfully`);
      
      if (successCount === cart.items.length) {
        setShowCheckoutModal(false);
        navigate("/uorder");
      }
    } catch (error) {
      console.error("Error during checkout process:", error);
      alert("An error occurred during checkout");
    } finally {
      setIsProcessing(false);
    }
  };

  // Function to calculate discounted price
  const getDiscountedPrice = (price, discountPercentage) => {
    if (discountPercentage > 0) {
      return price * (1 - discountPercentage / 100);
    }
    return price;
  };

  // Function to calculate total with discounts
  const calculateTotalWithDiscounts = () => {
    if (!cart || !cart.items) return 0;
    
    return cart.items.reduce((total, item) => {
      const discountedPrice = getDiscountedPrice(
        item.price,
        item.productId.discountPercentage
      );
      return total + (discountedPrice * item.quantity);
    }, 0);
  };

  const styles = {
    pageContainer: {
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
      paddingBottom: "100px",
    },
    headerStyle: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "white",
      textAlign: "center",
      padding: "20px",
      borderRadius: "10px",
      margin: "20px 0",
    },
    header: {
      textAlign: "center",
      padding: "30px 0",
      backgroundColor: "#28a745",
      color: "white",
      marginBottom: "30px",
    },
    cartContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
    },
    cartItem: {
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "25px",
      marginBottom: "25px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      gap: "30px",
    },
    productImage: {
      width: "200px",
      height: "200px",
      objectFit: "cover",
      borderRadius: "8px",
    },
    productDetails: {
      flex: 1,
    },
    productActions: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minWidth: "200px",
    },
    quantityControls: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    quantityButton: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      border: "none",
      backgroundColor: "#28a745",
      color: "white",
      fontSize: "20px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    removeButton: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
    checkoutButton: {
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      padding: "15px 30px",
      borderRadius: "5px",
      fontSize: "18px",
      cursor: "pointer",
      marginTop: "30px",
      display: "block",
      width: "100%",
      maxWidth: "300px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    emptyCart: {
      textAlign: "center",
      fontSize: "20px",
      color: "#6c757d",
      marginTop: "50px",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "30px",
      width: "90%",
      maxWidth: "600px",
      maxHeight: "80vh",
      overflowY: "auto",
    },
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    modalCloseButton: {
      background: "none",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
    },
    formInput: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      border: "1px solid #ced4da",
      borderRadius: "5px",
      fontSize: "16px",
    },
    footer: {
      backgroundColor: "#343a40",
      color: "white",
      textAlign: "center",
      padding: "30px 0",
      marginTop: "50px",
    },
    footerLink: {
      color: "#28a745",
      textDecoration: "none",
      margin: "0 10px",
    },
    originalPrice: {
      textDecoration: "line-through",
      color: "#6c757d",
      marginRight: "8px",
    },
    discountedPrice: {
      color: "#dc3545",
      fontWeight: "bold",
    },
    totalSavings: {
      color: "#28a745",
      fontSize: "16px",
      marginTop: "5px",
    }
  };

  const totalWithDiscounts = calculateTotalWithDiscounts();
  const totalSavings = cart ? (cart.totalAmount - totalWithDiscounts).toFixed(2) : 0;

  return (
    <div style={styles.pageContainer}>
      <NavBar />
      <div style={styles.headerStyle}>
        <h1>Your Shopping Cart</h1>
      </div>

      <div style={styles.cartContainer}>
        {cart ? (
          <>
            {cart.items.map((item) => {
              const discountedPrice = getDiscountedPrice(
                item.price,
                item.productId.discountPercentage
              );
              const showDiscount = item.productId.discountPercentage > 0;

              return (
                <div key={item.productId._id} style={styles.cartItem}>
                  <img
                    src={`http://localhost:7000/${item.productId.image.replace(/^\//, "")}`}
                    alt={item.productId.pname}
                    style={styles.productImage}
                  />
                  <div style={styles.productDetails}>
                    <h3>{item.productId.pname}</h3>
                    <p style={{ color: "#6c757d", margin: "10px 0" }}>
                      {item.productId.discription}
                    </p>
                    <div style={{ margin: "15px 0" }}>
                      <h4>Product Details</h4>
                      <p>{item.productId.details}</p>
                      <p>
                        <strong>Category:</strong> {item.productId.category}
                      </p>
                      {showDiscount && (
                        <p style={{ color: "#dc3545" }}>
                          <strong>Special Offer:</strong> {item.productId.discountPercentage}% off
                        </p>
                      )}
                    </div>
                    <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                      {showDiscount ? (
                        <>
                          <span style={styles.originalPrice}>
                            ${item.price.toFixed(2)}
                          </span>
                          <span style={styles.discountedPrice}>
                            ${discountedPrice.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        `$${item.price.toFixed(2)}`
                      )}
                    </p>
                  </div>
                  <div style={styles.productActions}>
                    <div style={styles.quantityControls}>
                      <button
                        onClick={() => decreaseQuantity(item.productId._id, item.quantity)}
                        style={styles.quantityButton}
                      >
                        -
                      </button>
                      <span style={{ fontSize: "18px", minWidth: "30px", textAlign: "center" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.productId._id, item.quantity)}
                        style={styles.quantityButton}
                      >
                        +
                      </button>
                    </div>
                    <p style={{ fontSize: "20px", fontWeight: "bold", textAlign: "right" }}>
                      Total: ${(discountedPrice * item.quantity).toFixed(2)}
                      {showDiscount && (
                        <span style={{ display: "block", fontSize: "14px", color: "#6c757d" }}>
                          <s>${(item.price * item.quantity).toFixed(2)}</s>
                        </span>
                      )}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.productId._id)}
                      style={styles.removeButton}
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              );
            })}
            <div style={{ textAlign: "right", marginTop: "30px" }}>
              <h2>
                Cart Total: ${totalWithDiscounts.toFixed(2)}
                {totalSavings > 0 && (
                  <div style={styles.totalSavings}>
                    You saved: ${totalSavings}
                  </div>
                )}
              </h2>
              <button
                onClick={() => setShowCheckoutModal(true)}
                style={styles.checkoutButton}
                disabled={!cart.items.length}
              >
                Proceed to Checkout ({cart.items.length} items)
              </button>
            </div>
          </>
        ) : (
          <p style={styles.emptyCart}>Your cart is empty.</p>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2>Checkout ({cart?.items.length} items)</h2>
              <button
                onClick={() => setShowCheckoutModal(false)}
                style={styles.modalCloseButton}
                disabled={isProcessing}
              >
                &times;
              </button>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <h4>Order Summary</h4>
              <div style={{ border: "1px solid #eee", borderRadius: "5px", padding: "15px" }}>
                {cart?.items.map(item => {
                  const discountedPrice = getDiscountedPrice(
                    item.price,
                    item.productId.discountPercentage
                  );
                  return (
                    <div key={item.productId._id} style={{ 
                      display: "flex", 
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid #eee"
                    }}>
                      <div>
                        <strong>{item.productId.pname}</strong> (x{item.quantity})
                      </div>
                      <div>
                        ${(discountedPrice * item.quantity).toFixed(2)}
                        {item.productId.discountPercentage > 0 && (
                          <div style={{ fontSize: "12px", color: "#6c757d", textAlign: "right" }}>
                            <s>${(item.price * item.quantity).toFixed(2)}</s>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between",
                  padding: "15px 0 0",
                  marginTop: "10px",
                  borderTop: "1px solid #ddd"
                }}>
                  <strong>Total:</strong>
                  <strong>${totalWithDiscounts.toFixed(2)}</strong>
                </div>
                {totalSavings > 0 && (
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between",
                    padding: "5px 0",
                    color: "#28a745"
                  }}>
                    <strong>You Save:</strong>
                    <strong>${totalSavings}</strong>
                  </div>
                )}
              </div>
            </div>

            <h4 style={{ marginBottom: "15px" }}>Shipping Information</h4>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={orderData.name}
              onChange={handleInputChange}
              style={styles.formInput}
              disabled={isProcessing}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={orderData.email}
              onChange={handleInputChange}
              style={styles.formInput}
              disabled={isProcessing}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={orderData.phone}
              onChange={handleInputChange}
              style={styles.formInput}
              disabled={isProcessing}
            />
            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              value={orderData.address}
              onChange={handleInputChange}
              style={styles.formInput}
              disabled={isProcessing}
            />
            <input
              type="text"
              name="pincode"
              placeholder="Postal Code"
              value={orderData.pincode}
              onChange={handleInputChange}
              style={styles.formInput}
              disabled={isProcessing}
            />
            <select
              name="paymentMethod"
              value={orderData.paymentMethod}
              onChange={handleInputChange}
              style={styles.formInput}
              disabled={isProcessing}
            >
              <option value="">Select Payment Method</option>
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cash_on_delivery">Cash on Delivery</option>
            </select>

            {orderResults.length > 0 && (
              <div style={{ margin: "20px 0" }}>
                <h5>Order Results:</h5>
                {orderResults.map((result, index) => (
                  <div 
                    key={index}
                    style={{ 
                      padding: "10px",
                      margin: "5px 0",
                      backgroundColor: result.status === "success" ? "#d4edda" : "#f8d7da",
                      color: result.status === "success" ? "#155724" : "#721c24",
                      borderRadius: "5px",
                    }}
                  >
                    <strong>{result.productName}:</strong> {result.message}
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginTop: "20px" }}>
              <button
                onClick={() => setShowCheckoutModal(false)}
                style={{
                  padding: "12px 25px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={placeAllOrders}
                style={{
                  padding: "12px 25px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span style={{ marginRight: "10px" }}>Processing...</span>
                    <i className="fas fa-spinner fa-spin"></i>
                  </>
                ) : (
                  "Place Orders"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
    
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

export default CartPage;