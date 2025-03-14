import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavSeller from "../Components/Layout/NavSeller";

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
  const [visibleActivities, setVisibleActivities] = useState(3); // Number of activities to show initially

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userid");
      if (!userId) {
        setError("User ID not found. Please log in again.");
        return;
      }

      try {
        // Fetch statistics
        const statsResponse = await axios.get(
          `http://localhost:7000/seller/stats?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStatistics(statsResponse.data);

        // Fetch recent activities
        const activitiesResponse = await axios.get(
          `http://localhost:7000/seller/activities?userId=${userId}`,
          {



            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // Sort activities by timestamp (newest first)
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

  // Function to load more activities
  const loadMoreActivities = () => {
    setVisibleActivities((prev) => prev + 3); // Increase the number of visible activities by 3
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  return (
    <div style={styles.body}>
      <NavSeller />
      <header style={styles.header}>
        <h1>Welcome to EcoHarvest Seller Dashboard</h1>
        <p>Manage your products, orders, and grow your organic business</p>
      </header>

      {/* Background Image Section */}
      <div style={styles.imageContainer}>
        <img
          src="https://w0.peakpx.com/wallpaper/109/313/HD-wallpaper-farming-nature-sky-agriculture.jpg"
          alt="Farming Background"
          style={styles.image}
        />
        <div style={styles.imageStackedContainer}>
          <div style={styles.bgImage}>
            <div style={styles.textOverlay}>
              <h1 style={styles.title}>EcoHarvest</h1>
              <h2 style={styles.subtitle}>
                Marketplace for organic goods with yield forecasting tools
              </h2>
            </div>
            <div style={styles.textOverlayBottom}>
              <h3 style={styles.welcomeMessage}>Welcome to the Seller Dashboard!</h3>
              <p style={styles.subMessage}>
                Your one-stop shop for managing your organic products and orders.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div style={styles.quickActionsContainer}>
        <h2 style={styles.sectionHeading}>Quick Actions</h2>
        <div style={styles.quickActions}>
          <button
            onClick={() => navigate("/addpro")}
            style={styles.quickActionButton}
          >
            Add New Product
          </button>
          <button
            onClick={() => navigate("/rcor")}
            style={styles.quickActionButton}
          >
            View Orders
          </button>
          <button
            onClick={() => navigate("/soldproducts/:userId")}
            style={styles.quickActionButton}
          >
            Manage Inventory
          </button>
        </div>
      </div>

      {/* Statistics Section */}
      <div style={styles.statisticsContainer}>
        <h2 style={styles.sectionHeading}>Your Statistics</h2>
        <div style={styles.statistics}>
          <div style={styles.statisticCard}>
            <h3>Total Sales</h3>
            <p>${statistics.totalSales}</p>
          </div>
          <div style={styles.statisticCard}>
            <h3>Pending Orders</h3>
            <p>{statistics.pendingOrders}</p>
          </div>
          <div style={styles.statisticCard}>
            <h3>Customer Reviews</h3>
            <p>{statistics.averageRating}/5</p>
          </div>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div style={styles.recentActivitiesContainer}>
        <h2 style={styles.sectionHeading}>Recent Activities</h2>
        <div style={styles.recentActivitiesGrid}>
          {recentActivities.slice(0, visibleActivities).map((activity, index) => (
            <div key={index} style={styles.activityCard}>
              <p>{activity.message}</p>
              <small>{new Date(activity.timestamp).toLocaleString()}</small>
            </div>
          ))}
        </div>
        {visibleActivities < recentActivities.length && (
          <button
            onClick={loadMoreActivities}
            style={styles.loadMoreButton}
          >
            Read More
          </button>
        )}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2025 EcoHarvest. All rights reserved.</p>
        <p>
          Follow us on
          <a href="https://facebook.com" style={styles.link}>
            {" "}
            Facebook
          </a>
          ,
          <a href="https://instagram.com" style={styles.link}>
            {" "}
            Instagram
          </a>
          , and
          <a href="https://twitter.com" style={styles.link}>
            {" "}
            Twitter
          </a>
          .
        </p>
        <p>
          <Link to="/contact" style={styles.link}>
            Contact Us
          </Link>{" "}
          |
          <Link to="/about" style={styles.link}>
            About Us
          </Link>
        </p>
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
  },
  header: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    textAlign: "center",
    padding: "20px",
    borderRadius: "10px",
    margin: "20px",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: "500px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  textOverlay: {
    textAlign: "center",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "20px",
    borderRadius: "10px",
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
  },
  textOverlayBottom: {
    textAlign: "center",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "20px",
    borderRadius: "10px",
    position: "absolute",
    bottom: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "80%",
  },
  title: {
    fontSize: "48px",
    margin: "10px 0",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
  },
  subtitle: {
    fontSize: "24px",
    margin: "10px 0",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
  },
  welcomeMessage: {
    fontSize: "30px",
    margin: "10px 0",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
  },
  subMessage: {
    fontSize: "18px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
  },
  quickActionsContainer: {
    textAlign: "center",
    padding: "20px",
  },
  quickActions: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  quickActionButton: {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  statisticsContainer: {
    textAlign: "center",
    padding: "20px",
  },
  statistics: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  statisticCard: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "200px",
    textAlign: "center",
  },
  recentActivitiesContainer: {
    textAlign: "center",
    padding: "20px",
  },
  recentActivitiesGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  activityCard: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "calc(33.33% - 40px)", // 3 cards per row with gap
    textAlign: "left",
  },
  loadMoreButton: {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
  },
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "20px",
    marginTop: "30px",
  },
  link: {
    color: "#4caf50",
    textDecoration: "none",
    marginLeft: "5px",
  },
  sectionHeading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#2c3e50",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
  },
};

export default Sellerhome;