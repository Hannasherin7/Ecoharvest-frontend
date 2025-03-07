import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Viewuser = () => {
    const [users, setUsers] = useState([]);

    const deleteUser = (_id) => {
        let input = { "_id": _id };
        axios.post("http://localhost:7000/deleteuser", input)
            .then((response) => {
                console.log("Delete response:", response.data); // Log the response
                if (response.data.status === "success") {
                    alert("User deleted"); // Update alert message
                    setUsers(prevData => prevData.filter(user => user._id !== _id));
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
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("Could not fetch users. Please try again later.");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div style={styles.pageStyle}>
            <h1 style={styles.title}>View All Users</h1>
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
                        {users.map((user) => (
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
    tableContainer: {
        overflowX: 'auto',
        width: '80%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '10px',
        padding: '20px',
        backdropFilter: 'blur(10px)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: '10px',
        border: '1px solid rgba(255, 255, 255, 0.5)',
    },
    tableData: {
        padding: '10px',
        border: '1px solid rgba(255, 255, 255, 0.5)',
    },
    deleteButton: {
        backgroundColor: 'red', // Set button color to red
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Viewuser;
