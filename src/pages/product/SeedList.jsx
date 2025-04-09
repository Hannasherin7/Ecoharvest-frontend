import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../Components/Layout/NavBar";
import { FaSearch, FaStar, FaRegStar, FaShoppingCart, FaCommentAlt, FaTimes, FaUser, FaShareAlt, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export const SeedList = () => {
  // State declarations
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderData, setOrderData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    paymentMethod: "",
    orderQuantity: 1,
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedback, setFeedback] = useState({ text: "", rating: 0 });
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [currentProductFeedback, setCurrentProductFeedback] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [hasSubmittedFeedback, setHasSubmittedFeedback] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const loggedInUserId = localStorage.getItem("userid");

  const categories = [
    "Vegetable Seed",
    "Fruite Seed",
    "Flower Seed",
    "Field Crop Seed",
    "Oil Seeds Crop",
    "Fodder Crop",
  ];

  // Fetch products
  useEffect(() => {
    axios
      .get("http://localhost:7000/viewpro", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Fetched products:", response.data);
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Toggle description expansion
  const toggleDescription = (productId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  // Handler functions
  const handleInputChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleFeedbackChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Calculate total amount
  useEffect(() => {
    if (selectedProduct) {
      const discountedPrice = selectedProduct.price * (1 - selectedProduct.discountPercentage / 100);
      setTotalAmount(discountedPrice * orderData.orderQuantity);
    }
  }, [orderData.orderQuantity, selectedProduct]);

  // Product availability check
  const checkProductAvailability = async (productId, postalCode) => {
    try {
      const response = await axios.post("http://localhost:7000/check-availability", {
        productId,
        postalCode
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error checking product availability:", error);
      return { status: "error", message: "An error occurred while checking product availability." };
    }
  };

  // Order placement
  const placeOrder = async () => {
    if (
      orderData.name &&
      orderData.email &&
      orderData.phone &&
      orderData.address &&
      orderData.pincode &&
      orderData.paymentMethod
    ) {
      const availabilityResponse = await checkProductAvailability(selectedProduct._id, orderData.pincode);
      if (availabilityResponse.status === "error") {
        alert(availabilityResponse.message);
        return;
      }
  
      const discountedPrice = selectedProduct.price * (1 - selectedProduct.discountPercentage / 100);
      
      const orderPayload = {
        ...orderData,
        productId: selectedProduct._id,
        discountedPrice: discountedPrice * orderData.orderQuantity // Send the total discounted amount
      };
  
      axios
        .post("http://localhost:7000/order", orderPayload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.status === "success") {
            alert("Order placed successfully!");
            setSelectedProduct(null);
            setOrderId(response.data.orderId);
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => console.error("Order error:", error));
    } else {
      alert("Please fill all fields.");
    }
  };

  // Feedback functions
  const submitFeedback = async (productId) => {
    if (!loggedInUserId) {
      alert("Please log in to submit feedback.");
      return;
    }

    if (!feedback.text || !feedback.rating) {
      alert("Please provide both feedback text and rating.");
      return;
    }

    try {
      const feedbackPayload = {
        ...feedback,
        userId: loggedInUserId,
        productId,
        orderId,
      };

      const response = await axios.post(
        "http://localhost:7000/submit-feedback",
        feedbackPayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.message === "You have already submitted feedback for this order.") {
        setFeedbackError(response.data.message);
        setHasSubmittedFeedback(true);
      } else {
        alert("Feedback submitted successfully!");
        setFeedback({ text: "", rating: 0 });
        setShowFeedbackForm(false);
        setFeedbackError("");
        setHasSubmittedFeedback(true);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      if (error.response && error.response.data.message) {
        setFeedbackError(error.response.data.message);
      } else {
        alert("Failed to submit feedback.");
      }
    }
  };

  const handleReadFeedback = async (product) => {
    setCurrentProductFeedback(product.feedbacks || []);
    setCurrentProductId(product._id);
    setShowFeedbackModal(true);
    setFeedbackError("");

    try {
      const response = await axios.get(
        `http://localhost:7000/check-feedback/${product._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.hasSubmittedFeedback) {
        setHasSubmittedFeedback(true);
      } else {
        setHasSubmittedFeedback(false);
      }
    } catch (error) {
      console.error("Error checking feedback:", error);
    }
  };

  const handleAddFeedbackClick = async (productId) => {
    if (!loggedInUserId) {
      alert("Please log in to submit feedback.");
      return;
    }

    if (hasSubmittedFeedback) {
      setFeedbackError("You have already submitted feedback for this order.");
      return;
    }

    try {
      const eligibilityResponse = await axios.get(
        `http://localhost:7000/check-eligibility/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (eligibilityResponse.data.eligible) {
        setShowFeedbackForm(true);
      } else {
        alert("You are not eligible to submit feedback for this product.");
      }
    } catch (error) {
      console.error("Error checking eligibility:", error);
      alert("Failed to check eligibility.");
    }
  };

  // Add to cart function
  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/add-to-cart",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.pname.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.seedcategory === selectedCategory : true;
    const isSeedProduct = product.productype === "Seeds";
    return matchesSearch && matchesCategory && product.userId !== loggedInUserId && isSeedProduct;
  });

  // Star rating render
  const renderStars = (rating) => {
    return Array(5).fill().map((_, i) => (
      i < rating ? <FaStar key={i} style={{ color: "#FFA000" }} /> : <FaRegStar key={i} style={{ color: "#FFA000" }} />
    ));
  };

  // Share product function
  const shareProduct = (product) => {
    if (navigator.share) {
      navigator.share({
        title: product.pname,
        text: `Check out this ${product.seedcategory} seed on EcoHarvest`,
        url: window.location.href,
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      alert('Web Share API not supported in your browser');
    }
  };

  return (
    <div style={{ 
      backgroundColor: "#f9f9f9", 
      minHeight: "100vh",
    }}>
      {/* Fixed NavBar */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: "white",
        boxShadow: "0 10px 30px rgba(8, 1, 1, 0.82)"
      }}>
        <NavBar />
      </div>
      
      {/* Hero Section - Positioned absolutely behind content */}
      <div className="hero-section" style={{
        position: "fixed",
        top: "70px", // Below navbar
        left: 0,
        right: 0,
        height: "400px",
        background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: -1 // Behind content
      }}>
        <h1 style={{ 
          fontSize: "3rem", 
          fontWeight: "700",
          marginBottom: "20px",
          fontFamily: "'Playfair Display', serif"
        }}>
          Premium Quality Seeds
        </h1>
        <p style={{ 
          fontSize: "1.2rem",
          maxWidth: "700px",
          margin: "0 auto 30px",
          lineHeight: "1.6"
        }}>
          Grow your own organic garden with our certified seeds. Perfect for home gardens and professional farming.
        </p>
        
        {/* Search Bar */}
        <div style={{ 
          maxWidth: "600px", 
          margin: "0 auto",
          position: "relative",
          width: "100%"
        }}>
          <input
            type="text"
            placeholder="Search for seeds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
            style={{ 
              padding: "15px 20px 15px 50px",
              borderRadius: "50px",
              border: "none",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              width: "100%",
              fontSize: "1rem"
            }}
          />
          <FaSearch style={{
            position: "absolute",
            left: "20px",
            top: "15px",
            color: "#777",
            fontSize: "1.2rem"
          }} />
        </div>
      </div>

      {/* Content Section - Scrolls over hero image */}
      <div style={{ 
        position: "relative",
        marginTop: "470px", // Height of hero + navbar
        backgroundColor: "#f9f9f9",
        paddingTop: "40px",
        zIndex: 1 // Above hero image
      }}>
        <div className="container mb-5">
          {/* Categories */}
          <div className="row mb-5">
            <div className="col-12">
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: "600",
                color: "#333",
                marginBottom: "20px",
                textAlign: "center"
              }}>
                Browse by Category
              </h2>
              <div style={{ 
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "15px"
              }}>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    style={{
                      padding: "12px 20px",
                      borderRadius: "50px",
                      border: "none",
                      backgroundColor: selectedCategory === category ? "#4a934a" : "#f0f0f0",
                      color: selectedCategory === category ? "white" : "#333",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      fontWeight: "500",
                      fontSize: "0.9rem",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                      ":hover": {
                        backgroundColor: selectedCategory === category ? "#3d8b40" : "#e0e0e0"
                      }
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="row">
            <div className="col-12">
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: "600",
                color: "#333",
                marginBottom: "20px"
              }}>
                {searchTerm ? `Search Results for "${searchTerm}"` : "Featured Seeds"}
              </h2>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-5" style={{ 
              backgroundColor: "#fff", 
              borderRadius: "10px", 
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)" 
            }}>
              <img 
                src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" 
                alt="No seeds found" 
                style={{ width: "100px", marginBottom: "20px" }}
              />
              <h3 style={{ color: "#666" }}>No seeds found</h3>
              <p>Try a different search term or check back later for new arrivals!</p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredProducts.map((product) => {
                const discountedPrice = product.price * (1 - product.discountPercentage / 100);
                const isDescriptionExpanded = expandedDescriptions[product._id];
                return (
                  <div key={product._id} className="col-12 col-md-6 col-lg-4">
                    <div className="card h-100" style={{ 
                      border: "none",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      cursor: "pointer",
                      ":hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.12)"
                      }
                    }}>
                      <div style={{ 
                        height: "200px", // Reduced from 250px to 200px
                        overflow: "hidden",
                        position: "relative"
                      }}>
                        <img
                          src={`http://localhost:7000/${product.image.replace(/^\//, "")}`}
                          alt={product.pname}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.5s ease"
                          }}
                          className="card-img-top"
                          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        />
                        {product.discountPercentage > 0 && (
                          <div style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            backgroundColor: "#e53935",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "20px",
                            fontSize: "0.8rem",
                            fontWeight: "600"
                          }}>
                            {product.discountPercentage}% OFF
                          </div>
                        )}
                      </div>
                      <div className="card-body" style={{ padding: "20px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                          <h5 className="card-title" style={{ 
                            fontWeight: "600",
                            color: "#333",
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.2rem",
                            margin: 0
                          }}>
                            {product.pname}
                          </h5>
                          <button
                            onClick={() => shareProduct(product)}
                            style={{ 
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: "#333",
                              fontSize: "1rem",
                              padding: "0",
                              display: "flex",
                              alignItems: "center"
                            }}
                            title="Share this product"
                          >
                            <FaShareAlt />
                          </button>
                        </div>
                        
                        <div className="d-flex align-items-center mb-2" style={{ fontSize: "0.9rem" }}>
                          seller:
                          <FaUser style={{ color: "#777", marginRight: "8px" }} />
                          <span style={{ color: "#555" }}>{product.userId?.name || "Anonymous Seller"}</span>
                        </div>
                        
                        <p className="card-text" style={{ 
                          color: "#666",
                          fontSize: "0.9rem",
                          marginBottom: "15px",
                          display: "-webkit-box",
                          WebkitLineClamp: isDescriptionExpanded ? "none" : "3",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: isDescriptionExpanded ? "clip" : "ellipsis"
                        }}>
                          {product.discription}
                        </p>
                        <button 
                          onClick={() => toggleDescription(product._id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#4CAF50",
                            cursor: "pointer",
                            padding: "0",
                            marginBottom: "15px",
                            fontSize: "0.8rem",
                            fontWeight: "500"
                          }}
                        >
                          {isDescriptionExpanded ? "Read Less" : "Read More"}
                        </button>
                        
                        <p className="card-text" style={{ 
                          color: "#666",
                          fontSize: "0.9rem",
                          marginBottom: "15px"
                        }}>
                          <strong>Details:</strong> {product.details}
                        </p>
                        {product.specialOffers && (
                          <p className="card-text" style={{ 
                            color: "#666",
                            fontSize: "0.9rem",
                            marginBottom: "15px"
                          }}>
                            <strong>Special Offers:</strong> {product.specialOffers}
                          </p>
                        )}
                        
                        <div style={{ 
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                          marginBottom: "20px"
                        }}>
                          {product.discountPercentage > 0 ? (
                            <>
                              <span style={{ 
                                textDecoration: "line-through",
                                color: "#999",
                                marginRight: "0.5rem",
                                fontSize: "0.9rem"
                              }}>
                                ${product.price.toFixed(2)}
                              </span>
                              <span style={{ color: "#e53935" }}>
                                ${discountedPrice.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span>${product.price.toFixed(2)}</span>
                          )}
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center">
                          {product.quantity < 1 ? (
                            <button 
                              className="btn btn-sm" 
                              style={{ 
                                backgroundColor: "#f44336",
                                color: "white",
                                borderRadius: "50px",
                                padding: "8px 15px",
                                fontSize: "0.9rem",
                                cursor: "not-allowed"
                              }}
                              disabled
                            >
                              Out of Stock
                            </button>
                          ) : (
                            <button
                              onClick={() => setSelectedProduct(product)}
                              className="btn btn-sm" 
                              style={{ 
                                backgroundColor: "#4CAF50",
                                color: "white",
                                borderRadius: "50px",
                                padding: "8px 15px",
                                fontSize: "0.9rem"
                              }}
                            >
                              Buy Now
                            </button>
                          )}
                          
                          <div className="d-flex">
                            <button
                              onClick={() => addToCart(product._id, 1)}
                              className="btn btn-sm me-2 d-flex align-items-center"
                              style={{ 
                                backgroundColor: "#2196F3",
                                color: "white",
                                borderRadius: "50px",
                                padding: "8px 15px",
                                fontSize: "0.9rem",
                                opacity: product.quantity < 1 ? 0.5 : 1,
                                cursor: product.quantity < 1 ? "not-allowed" : "pointer"
                              }}
                              disabled={product.quantity < 1}
                            >
                              <FaShoppingCart style={{ marginRight: "5px" }} />
                              <span>Cart</span>
                            </button>
                            <button
                              onClick={() => handleReadFeedback(product)}
                              className="btn btn-sm d-flex align-items-center"
                              style={{ 
                                backgroundColor: "#FFA000",
                                color: "white",
                                borderRadius: "50px",
                                padding: "8px 15px",
                                fontSize: "0.9rem"
                              }}
                            >
                              <FaCommentAlt style={{ marginRight: "5px" }} />
                              <span>Feedback</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Order Modal */}
        {selectedProduct && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1001,
            padding: "20px"
          }}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "12px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
            }}>
              <div style={{
                padding: "1.5rem",
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <h5 style={{ 
                  margin: 0,
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#2c3e50"
                }}>
                  Place Order
                </h5>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    color: "#757575",
                    ":hover": {
                      color: "#333"
                    }
                  }}
                >
                  <FaTimes />
                </button>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ 
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333"
                  }}>
                    Product
                  </label>
                  <p>{selectedProduct.pname}</p>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ 
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333"
                  }}>
                    Price
                  </label>
                  <p>
                    <span style={{ 
                      textDecoration: "line-through",
                      color: "#999",
                      marginRight: "0.5rem"
                    }}>
                      ${selectedProduct.price.toFixed(2)}
                    </span>
                    <span style={{ color: "#e53935" }}>
                      ${(selectedProduct.price * (1 - selectedProduct.discountPercentage / 100)).toFixed(2)} ({selectedProduct.discountPercentage}% off)
                    </span>
                  </p>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="name" style={{ 
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333"
                  }}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    value={orderData.name}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "1rem",
                      transition: "all 0.2s ease",
                      ":focus": {
                        outline: "none",
                        borderColor: "#4CAF50",
                        boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.2)"
                      }
                    }}
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="email" style={{ 
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333"
                  }}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    value={orderData.email}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "1rem",
                      transition: "all 0.2s ease",
                      ":focus": {
                        outline: "none",
                        borderColor: "#4CAF50",
                        boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.2)"
                      }
                    }}
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="phone" style={{ 
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333"
                  }}>
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={orderData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "1rem",
                      transition: "all 0.2s ease",
                      ":focus": {
                        outline: "none",
                        borderColor: "#4CAF50",
                        boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.2)"
                      }
                    }}
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="address" style={{ 
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333"
                  }}>
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Your Address"
                    value={orderData.address}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "1rem",
                      transition: "all 0.2s ease",
                      ":focus": {
                        outline: "none",
                        borderColor: "#4CAF50",
                        boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.2)"
                      }
                    }}
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="pincode" style={{ 
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333"
                  }}>
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    placeholder="Your Pincode"
                    value={orderData.pincode}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "1rem",
                      transition: "all 0.2s ease",
                      ":focus": {
                        outline: "none",
                        borderColor: "#4CAF50",
                        boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.2)"
                      }
                    }}
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="orderQuantity" style={{ 
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333"
                  }}>
                    Quantity (Max: {selectedProduct.quantity})
                  </label>
                  <input
                    type="number"
                    id="orderQuantity"
                    name="orderQuantity"
                    placeholder="Quantity"
                    value={orderData.orderQuantity}
                    onChange={handleInputChange}
                    min="1"
                    max={selectedProduct.quantity}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "1rem",
                      transition: "all 0.2s ease",
                      ":focus": {
                        outline: "none",
                        borderColor: "#4CAF50",
                        boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.2)"
                      }
                    }}
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="paymentMethod" style={{ 
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333"
                  }}>
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={orderData.paymentMethod}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "1rem",
                      transition: "all 0.2s ease",
                      ":focus": {
                        outline: "none",
                        borderColor: "#4CAF50",
                        boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.2)"
                      }
                    }}
                  >
                    <option value="">Select Payment Method</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="cash_on_delivery">Cash on Delivery</option>
                  </select>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ 
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333"
                  }}>
                    Total Amount
                  </label>
                  <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                    ${totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
              <div style={{
                padding: "1rem 1.5rem",
                borderTop: "1px solid #eee",
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.5rem"
              }}>
                <button
                  onClick={() => setSelectedProduct(null)}
                  style={{ 
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                    background: "#757575",
                    color: "white"
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={placeOrder}
                  style={{ 
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                    background: "#4CAF50",
                    color: "white",
                    ":disabled": {
                      background: "#e0e0e0",
                      cursor: "not-allowed"
                    }
                  }}
                  disabled={
                    !orderData.name ||
                    !orderData.email ||
                    !orderData.phone ||
                    !orderData.address ||
                    !orderData.pincode ||
                    !orderData.paymentMethod
                  }
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Modal */}
        {showFeedbackModal && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1001,
            padding: "20px"
          }}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "12px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
            }}>
              <div style={{
                padding: "1.5rem",
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <h5 style={{ 
                  margin: 0,
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#2c3e50"
                }}>
                  Product Feedback
                </h5>
                <button 
                  onClick={() => {
                    setShowFeedbackModal(false);
                    setShowFeedbackForm(false);
                    setFeedbackError("");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    color: "#757575",
                    ":hover": {
                      color: "#333"
                    }
                  }}
                >
                  <FaTimes />
                </button>
              </div>
              <div style={{ padding: "1.5rem" }}>
                {currentProductFeedback.length > 0 ? (
                  currentProductFeedback.map((fb, index) => (
                    <div key={index} style={{
                      background: "#f9f9f9",
                      borderRadius: "8px",
                      padding: "1rem",
                      marginBottom: "1rem"
                    }}>
                      <p style={{ 
                        fontWeight: "600",
                        color: "#2c3e50",
                        marginBottom: "0.5rem"
                      }}>
                        {fb.userId?.name || "Anonymous User"}
                      </p>
                      <p style={{ marginBottom: "0.5rem" }}>{fb.text}</p>
                      <div style={{ color: "#FFA000", fontSize: "1rem" }}>
                        {renderStars(fb.rating)}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No feedback yet. Be the first to review!</p>
                )}

                {feedbackError && <p style={{ 
                  color: "#e53935",
                  margin: "0.5rem 0",
                  fontSize: "0.9rem"
                }}>
                  {feedbackError}
                </p>}

                {!hasSubmittedFeedback && !showFeedbackForm && (
                  <button
                    onClick={() => handleAddFeedbackClick(currentProductId)}
                    style={{ 
                      padding: "0.5rem 1rem",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      transition: "all 0.2s ease",
                      background: "#4CAF50",
                      color: "white",
                      marginTop: "1rem"
                    }}
                  >
                    Add Your Feedback
                  </button>
                )}

                {showFeedbackForm && (
                  <div style={{ marginTop: "1.5rem" }}>
                    <div style={{ marginBottom: "1rem" }}>
                      <label htmlFor="feedbackText" style={{ 
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "500",
                        color: "#333"
                      }}>
                        Your Feedback
                      </label>
                      <textarea
                        id="feedbackText"
                        name="text"
                        placeholder="Share your experience with this product..."
                        value={feedback.text}
                        onChange={handleFeedbackChange}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          fontSize: "1rem",
                          transition: "all 0.2s ease",
                          minHeight: "100px",
                          resize: "vertical",
                          ":focus": {
                            outline: "none",
                            borderColor: "#4CAF50",
                            boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.2)"
                          }
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label htmlFor="feedbackRating" style={{ 
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "500",
                        color: "#333"
                      }}>
                        Rating
                      </label>
                      <select
                        id="feedbackRating"
                        name="rating"
                        value={feedback.rating}
                        onChange={handleFeedbackChange}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          fontSize: "1rem",
                          transition: "all 0.2s ease",
                          ":focus": {
                            outline: "none",
                            borderColor: "#4CAF50",
                            boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.2)"
                          }
                        }}
                      >
                        <option value={0}>Select Rating</option>
                        <option value={1}>1 Star</option>
                        <option value={2}>2 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={5}>5 Stars</option>
                      </select>
                    </div>
                    <button
                      onClick={() => submitFeedback(currentProductId)}
                      style={{ 
                        padding: "0.5rem 1rem",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        transition: "all 0.2s ease",
                        background: "#4CAF50",
                        color: "white",
                        ":disabled": {
                          background: "#e0e0e0",
                          cursor: "not-allowed"
                        }
                      }}
                      disabled={!feedback.text || !feedback.rating}
                    >
                      Submit Feedback
                    </button>
                  </div>
                )}
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
    </div>
  );
};