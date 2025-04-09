import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Layout/NavBar";
import { Link } from "react-router-dom";
import { 
  FaSearch, 
  FaUtensils, 
  FaUser, 
  FaShareAlt, 
  FaTimes,
  FaFacebook, 
  FaInstagram, 
  FaTwitter,
  FaCopy,
  FaEnvelope,
  FaLinkedin,
  FaWhatsapp
} from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Viewtip = () => {
  const [data, changeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedTip, setSelectedTip] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(null);
  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    axios
      .get("http://localhost:7000/viewtips")
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

  const handleViewTip = (tip) => {
    setSelectedTip(tip);
  };

  const closeTipModal = () => {
    setSelectedTip(null);
  };

  const handleShareClick = (tipId, event) => {
    event.stopPropagation();
    setShowShareOptions(showShareOptions === tipId ? null : tipId);
  };

  const copyToClipboard = (tipId) => {
    const tipLink = `${window.location.origin}/viewtip/${tipId}`;
    navigator.clipboard.writeText(tipLink);
    toast.success("Link copied to clipboard!");
    setShowShareOptions(null);
  };

  const shareOnSocialMedia = (platform, tip) => {
    const tipLink = `${window.location.origin}/viewtip/${tip._id}`;
    const text = `Check out this food storage tip for ${tip.item}: ${tip.tip.substring(0, 100)}...`;
    
    let url = "";
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(tipLink)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(tipLink)}&text=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(tipLink)}&title=${encodeURIComponent(tip.item)}&summary=${encodeURIComponent(text)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(`${text} ${tipLink}`)}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(`Food Storage Tip: ${tip.item}`)}&body=${encodeURIComponent(`${text}\n\nRead more: ${tipLink}`)}`;
        window.location.href = url;
        return;
      case 'instagram':
        // Instagram doesn't support direct sharing, so we'll just copy the link
        copyToClipboard(tip._id);
        return;
      default:
        return;
    }
    
    window.open(url, '_blank', 'width=600,height=400');
    setShowShareOptions(null);
  };

  const filteredData = data.filter((item) =>
    item.item.toLowerCase().includes(searchTerm.toLowerCase())
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
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <NavBar />
      </div>
      
      {/* Hero Section with Fixed Background and Fixed Content */}
      <div style={{
        position: "fixed",
        top: "60px", // Below navbar
        left: 0,
        right: 0,
        height: "60vh",
        zIndex: -1, // Behind content
      }}>
        {/* Background Image */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}></div>

        {/* Fixed Content Overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          padding: "0 20px",
          zIndex: 1
        }}>
          <div style={{
            maxWidth: "800px",
            width: "100%",
          }}>
            <h1 style={{ 
              fontSize: "3rem", 
              fontWeight: "700",
              marginBottom: "20px",
              fontFamily: "'Playfair Display', serif",
              textShadow: "0 2px 4px rgba(0,0,0,0.5)"
            }}>
              Smart Storage Solutions
            </h1>
            <p style={{ 
              fontSize: "1.2rem",
              margin: "0 auto 30px",
              lineHeight: "1.6",
              textShadow: "0 1px 3px rgba(0,0,0,0.5)"
            }}>
              Discover expert tips to keep your food fresh longer and reduce waste
            </p>
            
            {/* Search Bar */}
            <div style={{ 
              maxWidth: "600px", 
              margin: "0 auto",
              position: "relative"
            }}>
              <input
                type="text"
                placeholder="Search storage tips..."
                value={searchTerm}
                onChange={handleSearch}
                className="form-control"
                style={{ 
                  padding: "15px 20px 15px 50px",
                  borderRadius: "50px",
                  border: "none",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
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
        </div>
      </div>

      {/* Content Section - Needs to start below the hero */}
      <div className="container mb-5" style={{
        position: "relative",
        zIndex: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: "15px 15px 0 0",
        marginTop: "calc(60px + 60vh)", // Navbar height + hero height
        padding: "30px",
        boxShadow: "0 -5px 15px rgba(0,0,0,0.05)"
      }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: "600",
            color: "#333",
            margin: "0"
          }}>
            {searchTerm ? `Search Results for "${searchTerm}"` : "Featured Storage Tips"}
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
            <option value="/addtip">Upload Your Tip</option>
            <option value="/owntip">View Your Tips</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading storage tips...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-5" style={{ backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <FaUtensils style={{ fontSize: "3rem", color: "#ddd", marginBottom: "20px" }} />
            <h3 style={{ color: "#666" }}>No tips found</h3>
            <p>Try a different search term or upload your own tip!</p>
            <button 
              className="btn btn-success"
              onClick={() => navigate("/addtip")}
              style={{ 
                padding: "10px 25px",
                borderRadius: "50px",
                fontWeight: "500",
                marginTop: "15px"
              }}
            >
              Share Your Tip
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
                      src={`http://localhost:7000/${value.imaget.replace(/^\//, "")}`}
                      alt={value.item}
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
                      Storage Tip
                    </div>
                  </div>
                  <div className="card-body" style={{ padding: "20px" }}>
                    <h5 className="card-title" style={{ 
                      fontWeight: "600",
                      marginBottom: "10px",
                      color: "#333",
                      fontFamily: "'Playfair Display', serif"
                    }}>
                      {value.item}
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
                      {value.tip}
                    </p>
                    
                    <div className="d-flex align-items-center mb-3" style={{ fontSize: "0.8rem" }}>
                      <FaUser style={{ color: "#777", marginRight: "5px" }} />
                      <span style={{ color: "#555" }}>{value.userId?.name || "Anonymous"}</span>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        onClick={() => handleViewTip(value)}
                        className="btn btn-outline-success btn-sm" 
                        style={{ 
                          borderRadius: "50px",
                          padding: "5px 15px",
                          fontSize: "0.8rem"
                        }}
                      >
                        View Tip
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
                            right: 0,
                            bottom: "100%",
                            backgroundColor: "white",
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            padding: "15px",
                            width: "220px",
                            zIndex: 10,
                            animation: "fadeIn 0.2s ease-out"
                          }}>
                            <h6 style={{
                              margin: "0 0 10px 0",
                              fontSize: "0.9rem",
                              fontWeight: "600",
                              color: "#333"
                            }}>Share this tip</h6>
                            <div className="row g-2">
                              <div className="col-4 text-center">
                                <button 
                                  onClick={() => shareOnSocialMedia('facebook', value)}
                                  className="btn btn-sm p-2 w-100"
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "#3b5998"
                                  }}
                                >
                                  <FaFacebook size={20} />
                                  <div style={{ fontSize: "0.7rem", marginTop: "5px" }}>Facebook</div>
                                </button>
                              </div>
                              <div className="col-4 text-center">
                                <button 
                                  onClick={() => shareOnSocialMedia('twitter', value)}
                                  className="btn btn-sm p-2 w-100"
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "#1da1f2"
                                  }}
                                >
                                  <FaTwitter size={20} />
                                  <div style={{ fontSize: "0.7rem", marginTop: "5px" }}>Twitter</div>
                                </button>
                              </div>
                              <div className="col-4 text-center">
                                <button 
                                  onClick={() => shareOnSocialMedia('linkedin', value)}
                                  className="btn btn-sm p-2 w-100"
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "#0077b5"
                                  }}
                                >
                                  <FaLinkedin size={20} />
                                  <div style={{ fontSize: "0.7rem", marginTop: "5px" }}>LinkedIn</div>
                                </button>
                              </div>
                              <div className="col-4 text-center">
                                <button 
                                  onClick={() => shareOnSocialMedia('whatsapp', value)}
                                  className="btn btn-sm p-2 w-100"
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "#25D366"
                                  }}
                                >
                                  <FaWhatsapp size={20} />
                                  <div style={{ fontSize: "0.7rem", marginTop: "5px" }}>WhatsApp</div>
                                </button>
                              </div>
                              <div className="col-4 text-center">
                                <button 
                                  onClick={() => shareOnSocialMedia('email', value)}
                                  className="btn btn-sm p-2 w-100"
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "#666"
                                  }}
                                >
                                  <FaEnvelope size={20} />
                                  <div style={{ fontSize: "0.7rem", marginTop: "5px" }}>Email</div>
                                </button>
                              </div>
                              <div className="col-4 text-center">
                                <button 
                                  onClick={() => copyToClipboard(value._id)}
                                  className="btn btn-sm p-2 w-100"
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "#666"
                                  }}
                                >
                                  <FaCopy size={20} />
                                  <div style={{ fontSize: "0.7rem", marginTop: "5px" }}>Copy Link</div>
                                </button>
                              </div>
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

      {/* Tip Modal */}
      {selectedTip && (
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
              onClick={closeTipModal}
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
                  src={`http://localhost:7000/${selectedTip.imaget.replace(/^\//, "")}`}
                  alt={selectedTip.item}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "20px"
                  }}
                />
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  <button 
                    className="btn btn-outline-primary btn-sm d-flex align-items-center"
                    onClick={() => shareOnSocialMedia('facebook', selectedTip)}
                    style={{ borderRadius: "20px", padding: "5px 15px" }}
                  >
                    <FaFacebook className="me-2" /> Share
                  </button>
                  <button 
                    className="btn btn-outline-info btn-sm d-flex align-items-center"
                    onClick={() => shareOnSocialMedia('twitter', selectedTip)}
                    style={{ borderRadius: "20px", padding: "5px 15px" }}
                  >
                    <FaTwitter className="me-2" /> Tweet
                  </button>
                  <button 
                    className="btn btn-outline-secondary btn-sm d-flex align-items-center"
                    onClick={() => copyToClipboard(selectedTip._id)}
                    style={{ borderRadius: "20px", padding: "5px 15px" }}
                  >
                    <FaCopy className="me-2" /> Copy Link
                  </button>
                  <button 
                    className="btn btn-outline-success btn-sm d-flex align-items-center"
                    onClick={() => shareOnSocialMedia('whatsapp', selectedTip)}
                    style={{ borderRadius: "20px", padding: "5px 15px" }}
                  >
                    <FaWhatsapp className="me-2" /> WhatsApp
                  </button>
                  <button 
                    className="btn btn-outline-dark btn-sm d-flex align-items-center"
                    onClick={() => shareOnSocialMedia('linkedin', selectedTip)}
                    style={{ borderRadius: "20px", padding: "5px 15px" }}
                  >
                    <FaLinkedin className="me-2" /> LinkedIn
                  </button>
                  <button 
                    className="btn btn-outline-danger btn-sm d-flex align-items-center"
                    onClick={() => shareOnSocialMedia('email', selectedTip)}
                    style={{ borderRadius: "20px", padding: "5px 15px" }}
                  >
                    <FaEnvelope className="me-2" /> Email
                  </button>
                </div>
              </div>
              <div className="col-md-6">
                <h2 style={{ 
                  fontFamily: "'Playfair Display', serif",
                  marginBottom: "15px",
                  color: "#333"
                }}>
                  {selectedTip.item}
                </h2>
                <p style={{ color: "#555", marginBottom: "20px" }}>
                  <FaUser style={{ marginRight: "5px" }} />
                  By: {selectedTip.userId?.name || "Anonymous"}
                </p>
                <div>
                  <h4 style={{ 
                    fontFamily: "'Playfair Display', serif",
                    marginBottom: "10px",
                    color: "#4a934a"
                  }}>
                    Storage Tip
                  </h4>
                  <p style={{ whiteSpace: "pre-line" }}>
                    {selectedTip.tip}
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

      {/* Toast Notifications */}
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Add some global styles for the share animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};