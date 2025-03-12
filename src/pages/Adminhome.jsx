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

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get("http://localhost:7000/admin/activities", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
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
    if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

    return (
        <div style={styles.body}>
            {/* NavAdmin */}
            <NavAdmin />

            {/* Dashboard Content */}
            <div style={styles.container}>
                {/* Dashboard Header */}
                <div style={styles.header}>
                    <h1 style={styles.title}>Admin Dashboard</h1>
                    <p style={styles.subtitle}>Welcome to the Admin Panel</p>
                </div>

                {/* Quick Actions Section */}
                <div style={styles.quickActions}>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Manage Sellers</h3>
                        <p style={styles.cardText}>View and manage all Seller in the system.</p>
                        <Link to="/users" style={styles.cardLink}>Go to Sellers</Link>
                    </div>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Manage Buyers</h3>
                        <p style={styles.cardText}>View and manage all Buyers in the system.</p>
                        <Link to="/buyer" style={styles.cardLink}>Go to Buyers</Link>
                    </div>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Manage Products</h3>
                        <p style={styles.cardText}>View and manage all products in the marketplace.</p>
                        <Link to="/products" style={styles.cardLink}>Go to Products</Link>
                    </div>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>View Orders</h3>
                        <p style={styles.cardText}>Track and manage all customer orders.</p>
                        <Link to="/orders" style={styles.cardLink}>Go to Orders</Link>
                    </div>
                    {/* Commented out Analytics Card
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Analytics</h3>
                        <p style={styles.cardText}>View marketplace analytics and insights.</p>
                        <Link to="/admin/analytics" style={styles.cardLink}>Go to Analytics</Link>
                    </div>
                    */}
                </div>

                {/* Recent Activity Section */}
                <div style={styles.recentActivity}>
                    <h2 style={styles.sectionTitle}>Recent Activities</h2>
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
                                            <p><strong>Buyer:</strong> {activity.details.buyer}</p>
                                            <p><strong>Seller:</strong> {activity.details.seller}</p>
                                            <p><strong>Product:</strong> {activity.details.product}</p>
                                            <p><strong>Quantity:</strong> {activity.details.quantity}</p>
                                            <p><strong>Total Amount:</strong> ${activity.details.totalAmount}</p>
                                        </>
                                    )}
                                    {activity.type === "review" && (
                                        <>
                                            <p><strong>Reviewer:</strong> {activity.details.reviewer}</p>
                                            <p><strong>Seller:</strong> {activity.details.seller}</p>
                                            <p><strong>Product:</strong> {activity.details.product}</p>
                                            <p><strong>Rating:</strong> {activity.details.rating} stars</p>
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
        </div>
    );
};

const styles = {
    body: {
        backgroundImage: `url("https://png.pngtree.com/thumb_back/fh260/background/20231221/pngtree-smart-agriculture-drone-farmland-planting-photo-image_15542145.png")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        flex: 1,
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px',
    },
    title: {
        color: 'white',
        fontSize: '48px',
        margin: 0,
    },
    subtitle: {
        color: 'white',
        fontSize: '24px',
        margin: '10px 0',
    },
    quickActions: {
        display: 'flex',
        flexDirection: 'column', // Display one card per row
        gap: '20px',
        marginBottom: '40px',
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    cardTitle: {
        fontSize: '24px',
        margin: '0 0 10px',
        color: '#333',
    },
    cardText: {
        fontSize: '16px',
        color: '#666',
        margin: '0 0 20px',
    },
    cardLink: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        textDecoration: 'none',
        fontSize: '16px',
    },
    recentActivity: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    sectionTitle: {
        fontSize: '28px',
        margin: '0 0 20px',
        color: '#333',
    },
    activityList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // 3 activities in one row
        gap: '20px',
    },
    activityCard: {
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    activityText: {
        fontSize: '16px',
        color: '#333',
        margin: '0 0 10px',
    },
    activityTime: {
        fontSize: '14px',
        color: '#666',
        margin: '0 0 10px',
    },
    activityDetails: {
        marginTop: '10px',
        paddingLeft: '10px',
        borderLeft: '3px solid #4CAF50',
    },
    readMoreButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '20px',
        width: '100%',
    },
};

export default Adminhome;