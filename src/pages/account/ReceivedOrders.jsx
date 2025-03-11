import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from "../../Components/Layout/NavBar";
import { Link } from 'react-router-dom';
import NavSeller from '../../Components/Layout/NavSeller';

const ReceivedOrders = () => {
    const [receivedOrders, setReceivedOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReceivedOrders = async () => {
            const sellerId = localStorage.getItem('userid');
            console.log("Retrieved Seller ID from localStorage:", sellerId);

            if (!sellerId) {
                setError("User ID not found. Please log in again.");
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:7000/recievedorders?userId=${sellerId}`,
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    }
                );

                if (response.data.length > 0) {
                    const ordersWithStatus = response.data.map(order => {
                        const storedDeliveryStatus = localStorage.getItem(`order-${order.orderId}`);
                        return {
                            ...order,
                            deliveryStatus: storedDeliveryStatus === 'Delivered' ? 'Delivered' : 'Not Delivered'
                        };
                    });
                    setReceivedOrders(ordersWithStatus);
                } else {
                    setError("No received orders found.");
                }
            } catch (err) {
                console.error("Error fetching received orders:", err);
                setError("Could not fetch received orders. Please try again later.");
            }
        };

        fetchReceivedOrders();
    }, []);

    const markAsDelivered = (orderId) => {
        setReceivedOrders(prevOrders =>
            prevOrders.map(order =>
                order.orderId === orderId && order.deliveryStatus !== 'Delivered'
                    ? { ...order, deliveryStatus: 'Delivered' }
                    : order
            )
        );
        localStorage.setItem(`order-${orderId}`, 'Delivered');
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            await axios.post("http://localhost:7000/updateOrderStatus", {
                orderId,
                status: newStatus,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            
            setReceivedOrders(prevOrders =>
                prevOrders.map(order =>
                    order.orderId === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (error) {
            console.error("Error updating order status:", error);
            alert("Failed to update order status. Please try again.");
        }
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
            <NavSeller/>
            <h1 style={headerStyle}>Rcieved Orders</h1>
            {error && <p style={styles.error}>{error}</p>}
            {receivedOrders.length > 0 ? (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Address</th>
                            <th>User Email</th>
                            <th>Phone</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Delivery Status</th>
                            <th>Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receivedOrders.map((order) => (
                            <tr key={order.orderId}>
                                <td>{order.productName}</td>
                                <td>{order.address}</td>
                                <td>{order.userEmail}</td>
                                <td>{order.userPhone}</td>
                                <td>{order.quantity}</td>
                                <td>${order.price}</td>
                                <td>
                                    <button 
                                        onClick={() => markAsDelivered(order.orderId)} 
                                        disabled={order.deliveryStatus === 'Delivered'}
                                        style={styles.button}
                                    >
                                        {order.deliveryStatus}
                                    </button>
                                </td>
                                <td>
                                    <select
                                        className="form-select"
                                        value={order.status || "pending"}
                                        onChange={(e) => updateStatus(order.orderId, e.target.value)}
                                    >
                                        <option value="Order placed">Order placed</option>
                                        <option value="In transit">In transit</option>
                                        <option value="Out of delivery">Out of delivery</option>
                                        <option value="delivered">delivered</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !error && <p>Loading received orders...</p>
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
    title: {
        textAlign: 'center',
        margin: '20px 0',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    button: {
        padding: '5px 10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default ReceivedOrders;
