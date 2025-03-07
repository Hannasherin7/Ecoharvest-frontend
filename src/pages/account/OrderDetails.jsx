import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
            <h1 style={styles.title}>Order Details</h1>
            {error && <p style={styles.error}>{error}</p>}
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product ID</th>
                        
                        <th>Address</th>
                       
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.orderId}>
                            <td>{order.productName}</td> {/* Make sure to use productName */}
                            <td>{order.productId}</td> {/* Product ID */}
                           
                            <td>{order.address}</td>
                           
                            <td>{order.userEmail}</td>
                            <td>{order.userPhone}</td>
                            <td>{order.quantity}</td>
                            <td>{order.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
};

export default OrderDetails;
