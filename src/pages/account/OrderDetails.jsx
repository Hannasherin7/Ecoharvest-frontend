import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbaradmin from '../../Components/Layout/Navbaradmin';

const OrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:7000/viewallorders');
                setOrders(response.data);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError("Could not fetch orders. Please try again later.");
            }
        };

        fetchOrders();
    }, []);

    return (
        <div style={styles.pageStyle}>
            {/* Header */}
            <Navbaradmin/>

            {/* Page Title */}
            <h1 style={styles.title}>Order Details</h1>

            {/* Error Message */}
            {error && <p style={styles.error}>{error}</p>}

            {/* Orders Table */}
            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeaderRow}>
                            <th style={styles.tableHeader}>Product Name</th>
                            <th style={styles.tableHeader}>Product ID</th>
                            <th style={styles.tableHeader}>Address</th>
                            <th style={styles.tableHeader}>Email</th>
                            <th style={styles.tableHeader}>Phone</th>
                            <th style={styles.tableHeader}>Quantity</th>
                            <th style={styles.tableHeader}>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderId} style={styles.tableRow}>
                                <td style={styles.tableCell}>{order.productName}</td>
                                <td style={styles.tableCell}>{order.productId}</td>
                                <td style={styles.tableCell}>{order.address}</td>
                                <td style={styles.tableCell}>{order.userEmail}</td>
                                <td style={styles.tableCell}>{order.userPhone}</td>
                                <td style={styles.tableCell}>{order.quantity}</td>
                                <td style={styles.tableCell}>${order.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    pageStyle: {
        padding: '20px',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
    },
    title: {
        textAlign: 'center',
        margin: '20px 0',
        fontSize: '32px',
        color: '#333',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        margin: '10px 0',
    },
    tableContainer: {
        overflowX: 'auto', // Enable horizontal scrolling for small screens
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    tableHeaderRow: {
        backgroundColor: '#4CAF50',
        color: '#fff',
    },
    tableHeader: {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    },
    tableRow: {
        borderBottom: '1px solid #ddd',
        '&:hover': {
            backgroundColor: '#f9f9f9',
        },
    },
    tableCell: {
        padding: '12px',
        textAlign: 'left',
    },
};

export default OrderDetails;