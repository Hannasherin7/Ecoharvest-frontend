import axios from 'axios';
import React, { useState } from 'react';

const DeleteUser = () => {
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            console.log("Searching for user with ID:", userId); // Debug log
            const response = await axios.get(`http://localhost:7000/viewsign/${userId}`);
            console.log("User data received:", response.data); // Debug log
            setUser(response.data);
            setError('');
        } catch (err) {
            console.error("Error fetching user:", err);
            setUser(null);
            setError("User not found");
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:7000/deleteuser/${userId}`);
            setUser(null);
            setUserId(''); // Clear input after deletion
            setError('');
            alert('User deleted successfully');
        } catch (err) {
            console.error("Error deleting user:", err);
            setError("Failed to delete user");
        }
    };

    return (
        <div style={styles.pageStyle}>
            <h1 style={styles.title}>Delete User</h1>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter User ID"
                    style={styles.searchInput}
                />
                <button onClick={handleSearch} style={styles.searchButton}>Search</button>
            </div>
            {error && <p style={styles.error}>{error}</p>}
            {user && (
                <div style={styles.userDetails}>
                    <h2>User Details</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone No:</strong> {user.phone}</p>
                    <p><strong>Gender:</strong> {user.gender}</p>
                    <button onClick={handleDelete} style={styles.deleteButton}>Delete User</button>
                </div>
            )}
        </div>
    );
};

const styles = {
    pageStyle: {
        backgroundImage: "url('https://wallpapers.com/images/hd/aesthetic-astronaut-flower-field-laptop-4ndqwiauwee5jpze.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        padding: '20px',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        margin: '20px 0',
    },
    searchContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    searchInput: {
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        marginRight: '10px',
    },
    searchButton: {
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        cursor: 'pointer',
    },
    userDetails: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '20px',
        borderRadius: '10px',
        marginTop: '20px',
    },
    deleteButton: {
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: 'red',
        color: 'white',
        cursor: 'pointer',
        marginTop: '10px',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
};

export default DeleteUser;
