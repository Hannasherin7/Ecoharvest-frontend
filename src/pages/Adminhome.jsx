import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavAdmin from "../Components/Layout/NavAdmin";

const Adminhome = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [visibleActivities, setVisibleActivities] = useState(3); // Number of activities to show initially
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselImages = [
    "https://png.pngtree.com/background/20211215/original/pngtree-agricultural-science-and-technology-green-synthetic-plant-background-picture-image_1473355.jpg",
    "https://media.istockphoto.com/id/1358202423/photo/senior-farmer-standing-in-soybean-field-examining-crop-at-sunset.jpg?s=612x612&w=0&k=20&c=0PBJxYicprgkaS5NZetOUwOhytmWvshc8znuRv-_Vhk=",
  ];

  // Automatically change the image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/admin/activities",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setActivities(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching activities:", err);
        setError("Failed to fetch activities. Please try again later.");
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const handleReadMore = () => {
    setVisibleActivities((prev) => prev + 3); // Show 3 more activities
  };

  if (loading) return <p>Loading...</p>;
  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div style={styles.body}>
      {/* NavAdmin */}
      <NavAdmin />

      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>Admin Dashboard</h1>
          <p style={styles.headerSubtitle}>
            Manage your platform with ease and efficiency
          </p>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div style={styles.quickActionsContainer}>
        <h2 style={styles.sectionHeading}>Quick Actions</h2>
        <div style={styles.quickActions}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Manage Sellers</h3>
            <p style={styles.cardText}>
              View and manage all sellers in the system.
            </p>
            <Link to="/users" style={styles.cardLink}>
              Go to Sellers
            </Link>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Manage Buyers</h3>
            <p style={styles.cardText}>
              View and manage all buyers in the system.
            </p>
            <Link to="/buyer" style={styles.cardLink}>
              Go to Buyers
            </Link>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Manage Products</h3>
            <p style={styles.cardText}>
              View and manage all products in the marketplace.
            </p>
            <Link to="/products" style={styles.cardLink}>
              Go to Products
            </Link>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>View Orders</h3>
            <p style={styles.cardText}>Track and manage all customer orders.</p>
            <Link to="/orders" style={styles.cardLink}>
              Go to Orders
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div style={styles.recentActivity}>
        <h2 style={styles.sectionHeading}>Recent Activities</h2>
        <div style={styles.activityList}>
          {activities.slice(0, visibleActivities).map((activity, index) => (
            <div key={index} style={styles.activityCard}>
              <p style={styles.activityText}>{activity.message}</p>
              <p style={styles.activityTime}>
                {new Date(activity.timestamp).toLocaleString()}
              </p>
              <div style={styles.activityDetails}>
                {activity.type === "order" && (
                  <>
                    <p>
                      <strong>Buyer:</strong> {activity.details.buyer}
                    </p>
                    <p>
                      <strong>Seller:</strong> {activity.details.seller}
                    </p>
                    <p>
                      <strong>Product:</strong> {activity.details.product}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {activity.details.quantity}
                    </p>
                    <p>
                      <strong>Total Amount:</strong> $
                      {activity.details.totalAmount}
                    </p>
                  </>
                )}
                {activity.type === "review" && (
                  <>
                    <p>
                      <strong>Reviewer:</strong> {activity.details.reviewer}
                    </p>
                    <p>
                      <strong>Seller:</strong> {activity.details.seller}
                    </p>
                    <p>
                      <strong>Product:</strong> {activity.details.product}
                    </p>
                    <p>
                      <strong>Rating:</strong> {activity.details.rating} stars
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Read More Button */}
        {visibleActivities < activities.length && (
          <button onClick={handleReadMore} style={styles.readMoreButton}>
            Read More
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#f4f4f9",
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
  },
  header: {
    backgroundImage: "url(https://png.pngtree.com/background/20211215/original/pngtree-agricultural-science-and-technology-green-synthetic-plant-background-picture-image_1473355.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    textAlign: "center",
    position: "relative",
  },
  headerContent: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "20px",
    borderRadius: "10px",
  },
  headerTitle: {
    fontSize: "48px",
    margin: "0",
    fontWeight: "700",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
  },
  headerSubtitle: {
    fontSize: "24px",
    margin: "10px 0 0",
    fontWeight: "400",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
  },
  quickActionsContainer: {
    padding: "40px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  sectionHeading: {
    fontSize: "32px",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: "20px",
    textAlign: "center",
  },
  quickActions: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: "10px",
  },
  cardText: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  cardLink: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
  },
  recentActivity: {
    padding: "40px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  activityList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  activityCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  activityText: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "10px",
  },
  activityTime: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
  },
  activityDetails: {
    marginTop: "10px",
    paddingLeft: "10px",
    borderLeft: "3px solid #4CAF50",
  },
  readMoreButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
    display: "block",
    margin: "20px auto 0",
  },
};

export default Adminhome;