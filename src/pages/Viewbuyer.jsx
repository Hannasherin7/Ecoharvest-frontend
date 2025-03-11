import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavAdmin from '../Components/Layout/NavAdmin';

const Viewbuyer = () => {
    const [users, setUsers] = useState([]); // All buyers fetched from the backend
    const [filteredUsers, setFilteredUsers] = useState([]); // Buyers filtered based on search query
    const [searchQuery, setSearchQuery] = useState(''); // Search input value

    const deleteUser = (_id) => {
        let input = { "_id": _id };
        axios.post("http://localhost:7000/deleteuser", input)
            .then((response) => {
                console.log("Delete response:", response.data); // Log the response
                if (response.data.status === "success") {
                    alert("User deleted"); // Update alert message
                    setUsers(prevData => prevData.filter(user => user._id !== _id));
                    setFilteredUsers(prevData => prevData.filter(user => user._id !== _id)); // Update filtered users
                } else {
                    alert(`Error: ${response.data.message || "Unknown error"}`);
                }
            })
            .catch((error) => {
                console.error("Error deleting user:", error); // Log the error
                alert("Could not delete user. Please try again later.");
            });
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:7000/viewsign");
            // Filter users to show only buyers
            const buyers = response.data.filter(user => user.usertype === "buyer");
            setUsers(buyers);
            setFilteredUsers(buyers); // Initialize filtered users with all buyers
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("Could not fetch users. Please try again later.");
        }
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter buyers based on the search query
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.phone.toLowerCase().includes(query) ||
            user.gender.toLowerCase().includes(query) ||
            user._id.toLowerCase().includes(query)
        );
        setFilteredUsers(filtered);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div style={styles.pageStyle}>
            <NavAdmin/>
            <h1 style={styles.title}>View All Buyers</h1>

            {/* Search Bar */}
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search buyers by name, email, phone, gender, or ID..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={styles.searchInput}
                />
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Name</th>
                            <th style={styles.tableHeader}>Email</th>
                            <th style={styles.tableHeader}>Phone No</th>
                            <th style={styles.tableHeader}>Gender</th>
                            <th style={styles.tableHeader}>User ID</th>
                            <th style={styles.tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id}>
                                <td style={styles.tableData}>{user.name}</td>
                                <td style={styles.tableData}>{user.email}</td>
                                <td style={styles.tableData}>{user.phone}</td>
                                <td style={styles.tableData}>{user.gender}</td>
                                <td style={styles.tableData}>{user._id}</td>
                                <td>
                                    <button 
                                        style={styles.deleteButton} 
                                        onClick={() => { deleteUser(user._id) }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <footer style={styles.footer}>
                <p>&copy; 2025 EcoHarvest. All rights reserved.</p>
                <p>
                    Follow us on{' '}
                    <a href="https://facebook.com" style={styles.footerLink}>
                        Facebook
                    </a>
                    ,{' '}
                    <a href="https://instagram.com" style={styles.footerLink}>
                        Instagram
                    </a>
                    , and{' '}
                    <a href="https://twitter.com" style={styles.footerLink}>
                        Twitter
                    </a>
                    .
                </p>
                <p>
                    <a href="/contact" style={styles.footerLink}>
                        Contact Us
                    </a>{' '}
                    |{' '}
                    <a href="/about" style={styles.footerLink}>
                        About Us
                    </a>
                </p>
            </footer>
        </div>
    );
};

const styles = {
    pageStyle: {
        backgroundColor: '#f4f4f9', // Light background color
        minHeight: '100vh',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        margin: '20px 0',
        color: '#2c3e50', // Dark text color
    },
    searchContainer: {
        marginBottom: '20px',
        width: '80%',
    },
    searchInput: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    tableContainer: {
        overflowX: 'auto',
        width: '80%',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: '#4caf50', // Green header background
        color: 'white',
        padding: '10px',
        border: '1px solid #ddd',
    },
    tableData: {
        padding: '10px',
        border: '1px solid #ddd',
        color: '#333', // Dark text color
    },
    deleteButton: {
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    footer: {
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: '20px',
        marginTop: 'auto',
        width: '100%',
    },
    footerLink: {
        color: '#4caf50',
        textDecoration: 'none',
    },
};

export default Viewbuyer;