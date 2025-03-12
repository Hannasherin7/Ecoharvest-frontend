import React, { useState, useEffect } from "react";
import axios from "axios";
import NavSeller from "../../Components/Layout/NavSeller";
import { Link } from "react-router-dom"; // For footer navigation

const OwnComplaints = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("http://localhost:7000/ownComplaint", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then((response) => {
            setComplaints(response.data.complaints);
        }).catch((error) => {
            console.error("Error fetching complaints:", error);
        });
    };

    // Styles
    const styles = {
        footer: {
            backgroundColor: '#333',
            color: '#fff',
            textAlign: 'center',
            padding: '20px',
            marginTop: '30px',
        },
        link: {
            color: '#4caf50',
            textDecoration: 'none',
        },
    };

    const headerStyle = {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "white",
        textAlign: "center",
        padding: "20px",
        borderRadius: "10px",
        margin: "20px 0",
    };

    return (
        <div>
            <NavSeller />
            <div className="container mt-4">
                <h1 style={headerStyle}>Your Complaints</h1>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Complaint</th>
                                <th>Resolution Request</th>
                                <th>Status</th>
                                <th>Admin Message</th>
                                <th>Image</th> {/* New column for image */}
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((comp) => (
                                <tr key={comp._id}>
                                    <td>{comp.name}</td>
                                    <td>{comp.email}</td>
                                    <td>{comp.phoneNumber}</td>
                                    <td>{comp.complaint}</td>
                                    <td>{comp.resolutionRequest}</td>
                                    <td>{comp.status}</td>
                                    <td>{comp.adminMessage}</td>
                                    <td>
                                        {comp.image && ( // Display image if it exists
                                            <img
                                                src={`http://localhost:7000/${comp.image}`}
                                                alt="Complaint Evidence"
                                                style={{ width: "100px", height: "auto" }}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Footer */}
            <footer style={styles.footer}>
                <p>&copy; 2025 EcoHarvest. All rights reserved.</p>
                <p>
                    Follow us on
                    <a href="https://facebook.com" style={styles.link}> Facebook</a>,
                    <a href="https://instagram.com" style={styles.link}> Instagram</a>, and
                    <a href="https://twitter.com" style={styles.link}> Twitter</a>.
                </p>
                <p>
                    <Link to="/contact" style={styles.link}>Contact Us</Link> |
                    <Link to="/about" style={styles.link}> About Us</Link>
                </p>
            </footer>
        </div>
    );
};

export default OwnComplaints;