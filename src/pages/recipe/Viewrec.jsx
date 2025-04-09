import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Layout/NavBar";
import { Link } from "react-router-dom";
import { FaSearch, FaUtensils, FaUser, FaShareAlt, FaTimes, FaFacebook, FaInstagram, FaTwitter, FaCopy, FaCheck } from "react-icons/fa";

export const Viewrec = () => {
  const [data, changeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(null);
  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    axios
      .get("http://localhost:7000/viewrec")
      .then((response) => {
        changeData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigation = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      navigate(selectedValue);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeRecipeModal = () => {
    setSelectedRecipe(null);
  };

  const handleShareClick = (recipeId, e) => {
    e.stopPropagation();
    setShowShareOptions(showShareOptions === recipeId ? null : recipeId);
  };

  const copyToClipboard = (recipeId) => {
    const recipeLink = `${window.location.origin}/recipe/${recipeId}`;
    navigator.clipboard.writeText(recipeLink);
    setCopied(recipeId);
    setTimeout(() => setCopied(null), 2000);
  };

  const shareOnSocialMedia = (platform, recipe) => {
    const recipeLink = `${window.location.origin}/recipe/${recipe._id}`;
    const text = `Check out this delicious recipe: ${recipe.titler}`;
    
    let url = "";
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recipeLink)}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(recipeLink)}`;
        break;
      case "instagram":
        // Instagram doesn't support direct sharing, so we'll just open their app
        url = "https://www.instagram.com/";
        break;
      default:
        return;
    }
    
    window.open(url, "_blank", "width=600,height=400");
    setShowShareOptions(null);
  };

  const filteredData = data.filter((item) =>
    item.titler.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="recipe-app" style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
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
        background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')",
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
          Discover Culinary Delights
        </h1>
        <p style={{ 
          fontSize: "1.2rem",
          maxWidth: "700px",
          margin: "0 auto 30px",
          lineHeight: "1.6"
        }}>
          Explore our collection of delicious recipes from around the world. Find your next favorite dish!
        </p>
        
        {/* Search Bar */}
        <div style={{ 
          maxWidth: "600px", 
          margin: "0 auto",
          position: "relative"
        }}>
          <input
            type="text"
            placeholder="Search for recipes..."
            value={searchTerm}
            onChange={handleSearch}
            className="form-control"
            style={{ 
              padding: "15px 20px 15px 50px",
              borderRadius: "50px",
              border: "none",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
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
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: "600",
              color: "#333",
              margin: "0"
            }}>
              {searchTerm ? `Search Results for "${searchTerm}"` : "Featured Recipes"}
            </h2>
            
            <select
              onChange={handleNavigation}
              className="form-select"
              style={{ 
                width: "220px",
                borderRadius: "50px",
                padding: "10px 15px",
                border: "1px solid #ddd",
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
              }}
            >
              <option value="">More Options</option>
              <option value="/addrec">Upload Your Recipe</option>
              <option value="/ownrec">View Your Recipes</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading delicious recipes...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-5" style={{ backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <FaUtensils style={{ fontSize: "3rem", color: "#ddd", marginBottom: "20px" }} />
              <h3 style={{ color: "#666" }}>No recipes found</h3>
              <p>Try a different search term or upload your own recipe!</p>
              <button 
                className="btn btn-success"
                onClick={() => navigate("/addrec")}
                style={{ 
                  padding: "10px 25px",
                  borderRadius: "50px",
                  fontWeight: "500",
                  marginTop: "15px"
                }}
              >
                Share Your Recipe
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {filteredData.map((value, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3">
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
                      height: "200px",
                      overflow: "hidden",
                      position: "relative"
                    }}>
                      <img
                        src={`http://localhost:7000/${value.imager.replace(/^\//, "")}`}
                        alt={value.titler}
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
                      <div style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "rgba(255,255,255,0.9)",
                        padding: "5px 10px",
                        borderRadius: "20px",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        color: "#4a934a"
                      }}>
                        {value.typer}
                      </div>
                    </div>
                    <div className="card-body" style={{ padding: "20px" }}>
                      <h5 className="card-title" style={{ 
                        fontWeight: "600",
                        marginBottom: "10px",
                        color: "#333",
                        fontFamily: "'Playfair Display', serif"
                      }}>
                        {value.titler}
                      </h5>
                      
                      <p className="card-text" style={{ 
                        color: "#666",
                        fontSize: "0.9rem",
                        marginBottom: "15px",
                        display: "-webkit-box",
                        WebkitLineClamp: "3",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}>
                        {value.descriptionr}
                      </p>
                      
                      <div className="d-flex align-items-center mb-3" style={{ fontSize: "0.8rem" }}>
                        <FaUser style={{ color: "#777", marginRight: "5px" }} />
                        <span style={{ color: "#555" }}>{value.userId?.name || "Anonymous"}</span>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          onClick={() => handleViewRecipe(value)}
                          className="btn btn-outline-success btn-sm" 
                          style={{ 
                            borderRadius: "50px",
                            padding: "5px 15px",
                            fontSize: "0.8rem"
                          }}
                        >
                          View Recipe
                        </button>
                        <div style={{ position: "relative" }}>
                          <button 
                            onClick={(e) => handleShareClick(value._id, e)}
                            className="btn btn-sm" 
                            style={{ 
                              backgroundColor: "transparent",
                              color: "#777",
                              padding: "0",
                              ":hover": {
                                color: "#4a934a"
                              }
                            }}
                          >
                            <FaShareAlt />
                          </button>
                          
                          {showShareOptions === value._id && (
                            <div style={{
                              position: "absolute",
                              bottom: "100%",
                              right: 0,
                              backgroundColor: "white",
                              borderRadius: "8px",
                              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                              padding: "10px",
                              zIndex: 10,
                              width: "180px"
                            }}>
                              <div 
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "5px 10px",
                                  cursor: "pointer",
                                  borderRadius: "4px",
                                  ":hover": {
                                    backgroundColor: "#f5f5f5"
                                  }
                                }}
                                onClick={() => shareOnSocialMedia("facebook", value)}
                              >
                                <FaFacebook style={{ color: "#3b5998", marginRight: "8px" }} />
                                <span>Facebook</span>
                              </div>
                              <div 
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "5px 10px",
                                  cursor: "pointer",
                                  borderRadius: "4px",
                                  ":hover": {
                                    backgroundColor: "#f5f5f5"
                                  }
                                }}
                                onClick={() => shareOnSocialMedia("twitter", value)}
                              >
                                <FaTwitter style={{ color: "#1da1f2", marginRight: "8px" }} />
                                <span>Twitter</span>
                              </div>
                              <div 
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "5px 10px",
                                  cursor: "pointer",
                                  borderRadius: "4px",
                                  ":hover": {
                                    backgroundColor: "#f5f5f5"
                                  }
                                }}
                                onClick={() => shareOnSocialMedia("instagram", value)}
                              >
                                <FaInstagram style={{ color: "#e4405f", marginRight: "8px" }} />
                                <span>Instagram</span>
                              </div>
                              <div 
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "5px 10px",
                                  cursor: "pointer",
                                  borderRadius: "4px",
                                  ":hover": {
                                    backgroundColor: "#f5f5f5"
                                  }
                                }}
                                onClick={() => copyToClipboard(value._id)}
                              >
                                {copied === value._id ? (
                                  <FaCheck style={{ color: "green", marginRight: "8px" }} />
                                ) : (
                                  <FaCopy style={{ color: "#777", marginRight: "8px" }} />
                                )}
                                <span>{copied === value._id ? "Copied!" : "Copy Link"}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recipe Modal */}
        {selectedRecipe && (
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
              borderRadius: "10px",
              maxWidth: "800px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "30px",
              position: "relative"
            }}>
              <button 
                onClick={closeRecipeModal}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#777"
                }}
              >
                <FaTimes />
              </button>
              
              <div className="row">
                <div className="col-md-6">
                  <img
                    src={`http://localhost:7000/${selectedRecipe.imager.replace(/^\//, "")}`}
                    alt={selectedRecipe.titler}
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      marginBottom: "20px"
                    }}
                  />
                  <div className="d-flex justify-content-center gap-3">
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => shareOnSocialMedia("facebook", selectedRecipe)}
                    >
                      <FaFacebook /> Share
                    </button>
                    <button 
                      className="btn btn-outline-info"
                      onClick={() => shareOnSocialMedia("twitter", selectedRecipe)}
                    >
                      <FaTwitter /> Tweet
                    </button>
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => copyToClipboard(selectedRecipe._id)}
                    >
                      {copied === selectedRecipe._id ? <FaCheck /> : <FaCopy />} Copy Link
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <h2 style={{ 
                    fontFamily: "'Playfair Display', serif",
                    marginBottom: "15px",
                    color: "#333"
                  }}>
                    {selectedRecipe.titler}
                  </h2>
                  <p style={{ color: "#555", marginBottom: "20px" }}>
                    <FaUser style={{ marginRight: "5px" }} />
                    By: {selectedRecipe.userId?.name || "Anonymous"}
                  </p>
                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{ 
                      fontFamily: "'Playfair Display', serif",
                      marginBottom: "10px",
                      color: "#4a934a"
                    }}>
                      Ingredients
                    </h4>
                    <p style={{ whiteSpace: "pre-line" }}>
                      {selectedRecipe.incredientsr}
                    </p>
                  </div>
                  <div>
                    <h4 style={{ 
                      fontFamily: "'Playfair Display', serif",
                      marginBottom: "10px",
                      color: "#4a934a"
                    }}>
                      Instructions
                    </h4>
                    <p style={{ whiteSpace: "pre-line" }}>
                      {selectedRecipe.descriptionr}
                    </p>
                  </div>
                </div>
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