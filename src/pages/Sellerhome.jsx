import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavSeller from "../Components/Layout/NavSeller";
 import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";


const Sellerhome = () => {
  const navigate = useNavigate();
  const [statistics, setStatistics] = useState({
    totalSales: 0,
    pendingOrders: 0,
    averageRating: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleActivities, setVisibleActivities] = useState(3);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const carouselImages = [
    "https://media.istockphoto.com/id/1270766965/photo/farmer-and-business-woman-shaking-hands-in-field.jpg?s=612x612&w=0&k=20&c=scJfennkxo0wmSuw0IIcjcWMrj8owF2qk2Pur0jzVWo=",
    "https://media.istockphoto.com/id/1358202423/photo/senior-farmer-standing-in-soybean-field-examining-crop-at-sunset.jpg?s=612x612&w=0&k=20&c=0PBJxYicprgkaS5NZetOUwOhytmWvshc8znuRv-_Vhk=",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userid");
      if (!userId) {
        setError("User ID not found. Please log in again.");
        return;
      }

      try {
        // Fetch seller-specific statistics
        const statsResponse = await axios.get(
          `http://localhost:7000/seller/stats?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStatistics(statsResponse.data);

        // Fetch seller-specific activities
        const activitiesResponse = await axios.get(
          `http://localhost:7000/seller/activities?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const sortedActivities = activitiesResponse.data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setRecentActivities(sortedActivities);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadMoreActivities = () => {
    setVisibleActivities((prev) => prev + 3);
  };

  if (loading) {
    return <div style={styles.loadingContainer}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.errorContainer}>{error}</div>;
  }

  return (
    <div style={styles.body}>
      <NavSeller />
      <header style={styles.header}>
        <h1>Welcome to Your Seller Dashboard</h1>
        <p>Manage your products, orders, and grow your organic business</p>
      </header>

      <div style={styles.carouselContainer}>
        <img
          src={carouselImages[currentImageIndex]}
          alt="Carousel"
          style={styles.carouselImage}
        />
        <div style={styles.carouselOverlay}>
          <h1 style={styles.carouselTitle}>EcoHarvest</h1>
          <h2 style={styles.carouselSubtitle}>
            Marketplace for organic goods with yield forecasting tools
          </h2>
        </div>
      </div>

      <div style={styles.quickActionsContainer}>
        <h2 style={styles.sectionHeading}>Quick Actions</h2>
        <div style={styles.quickActions}>
          <button
            onClick={() => navigate("/frmr")}
            style={styles.quickActionButton}
          >
            Sell New Product
          </button>
          <button
            onClick={() => navigate("/rcor")}
            style={styles.quickActionButton}
          >
            View Orders
          </button>
          <button
            onClick={() => navigate(`/soldproducts/${localStorage.getItem("userid")}`)}
            style={styles.quickActionButton}
          >
            Manage Inventory
          </button>
        </div>
      </div>

      <div style={styles.statisticsContainer}>
        <h2 style={styles.sectionHeading}>Your Business Statistics</h2>
        <div style={styles.statistics}>
          <div style={styles.statisticCard}>
            <h3>Total Sales</h3>
            <p>${statistics.totalSales.toFixed(2)}</p>
            <p style={styles.statisticSubtext}>All-time revenue</p>
          </div>
          <div style={styles.statisticCard}>
            <h3>Pending Orders</h3>
            <p>{statistics.pendingOrders}</p>
            <p style={styles.statisticSubtext}>Require your attention</p>
          </div>
          <div style={styles.statisticCard}>
            <h3>Average Rating</h3>
            <p>{statistics.averageRating.toFixed(1)}/5</p>
            <p style={styles.statisticSubtext}>Customer satisfaction</p>
          </div>
        </div>
      </div>

      <div style={styles.recentActivitiesContainer}>
        <h2 style={styles.sectionHeading}>Your Recent Activities</h2>
        <div style={styles.recentActivitiesGrid}>
          {recentActivities.slice(0, visibleActivities).map((activity, index) => (
            <div key={index} style={styles.activityCard}>
              <p style={styles.activityMessage}>{activity.message}</p>
              <small style={styles.activityTimestamp}>
                {new Date(activity.timestamp).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
        {visibleActivities < recentActivities.length && (
          <button
            onClick={loadMoreActivities}
            style={styles.loadMoreButton}
          >
            Show More Activities
          </button>
        )}
      </div>

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
  body: {
    backgroundColor: "#f4f4f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Poppins', sans-serif",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "1.5rem",
  },
  errorContainer: {
    color: "red",
    textAlign: "center",
    padding: "20px",
    fontSize: "1.2rem",
  },
  header: {
    backgroundColor: "#2c3e50",
    color: "white",
    textAlign: "center",
    padding: "40px 20px",
    marginBottom: "30px",
  },
  carouselContainer: {
    position: "relative",
    width: "100%",
    height: "400px",
    overflow: "hidden",
    marginBottom: "40px",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  carouselOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "80%",
  },
  carouselTitle: {
    fontSize: "2.5rem",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  carouselSubtitle: {
    fontSize: "1.5rem",
    marginBottom: "0",
  },
  quickActionsContainer: {
    padding: "30px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  quickActions: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "20px",
  },
  quickActionButton: {
    backgroundColor: "#27ae60",
    color: "white",
    padding: "12px 25px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    minWidth: "200px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  quickActionButtonHover: {
    backgroundColor: "#2ecc71",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
  },
  statisticsContainer: {
    padding: "30px 20px",
    backgroundColor: "#ecf0f1",
    margin: "30px 0",
  },
  statistics: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    marginTop: "30px",
  },
  statisticCard: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "25px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "250px",
    textAlign: "center",
    transition: "transform 0.3s ease",
  },
  statisticCardHover: {
    transform: "translateY(-5px)",
  },
  statisticSubtext: {
    color: "#7f8c8d",
    fontSize: "0.9rem",
    marginTop: "10px",
  },
  recentActivitiesContainer: {
    padding: "30px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  recentActivitiesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    marginTop: "30px",
  },
  activityCard: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  },
  activityCardHover: {
    transform: "translateY(-3px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
  },
  activityMessage: {
    marginBottom: "10px",
    lineHeight: "1.5",
  },
  activityTimestamp: {
    color: "#7f8c8d",
    fontSize: "0.85rem",
  },
  loadMoreButton: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "12px 25px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "30px",
    transition: "all 0.3s ease",
  },
  loadMoreButtonHover: {
    backgroundColor: "#2980b9",
    transform: "translateY(-2px)",
  },
  footer: {
    backgroundColor: "#2c3e50",
    color: "white",
    textAlign: "center",
    padding: "30px 20px",
    marginTop: "50px",
  },
  link: {
    color: "#27ae60",
    textDecoration: "none",
    margin: "0 5px",
    fontWeight: "bold",
  },
  sectionHeading: {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: "20px",
    position: "relative",
  },
};

export default Sellerhome;