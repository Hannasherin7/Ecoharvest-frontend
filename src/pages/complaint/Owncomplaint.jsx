import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../Components/Layout/NavBar";
import NavSeller from "../../Components/Layout/NavSeller";

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

    return (
        <div>
            <NavSeller/>
            <div className="container">
                <h1>Your Complaints</h1>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OwnComplaints;