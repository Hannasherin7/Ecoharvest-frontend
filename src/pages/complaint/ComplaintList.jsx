import React, { useState, useEffect } from "react";
import axios from "axios";
import NavAdmin from "../../Components/Layout/NavAdmin";

const ComplaintList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("http://localhost:7000/complaintList", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then((response) => {
            setData(response.data);
        }).catch((error) => {
            console.error("Error fetching complaints:", error);
        });
    };

    const updateStatus = (_id, status, adminMessage) => {
        axios.post("http://localhost:7000/updateComplaintStatus", { _id, status, adminMessage })
            .then((response) => {
                if (response.data.status === "success") {
                    fetchData(); // Refresh the list after updating status
                }
            }).catch((error) => {
                console.error("Error updating status:", error);
            });
    };

    const deleteComplaint = (_id) => {
        axios.post("http://localhost:7000/deleteComplaint", { _id })
            .then((response) => {
                if (response.data.status === "success") {
                    fetchData(); // Refresh the list after deleting
                }
            }).catch((error) => {
                console.error("Error deleting complaint:", error);
            });
    };

    const handleSendMessage = (_id, status, adminMessage) => {
        if (!adminMessage.trim()) {
            alert("Admin message cannot be empty!");
            return;
        }
        updateStatus(_id, status, adminMessage); // Send the message
    };

    return (
        <div>
            <NavAdmin />
            <div className="container">
                <h1>Complaint List</h1>
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.complaint}</td>
                                <td>{item.resolutionRequest}</td>
                                <td>
                                    <select className="form-select" value={item.status} onChange={(e) => updateStatus(item._id, e.target.value, item.adminMessage)}>
                                        <option value="pending">Pending</option>
                                        <option value="resolved">Resolved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={item.adminMessage} 
                                        onChange={(e) => {
                                            const updatedData = data.map((complaint) =>
                                                complaint._id === item._id ? { ...complaint, adminMessage: e.target.value } : complaint
                                            );
                                            setData(updatedData);
                                        }} 
                                    />
                                    <button 
                                        className="btn btn-primary mt-2" 
                                        onClick={() => handleSendMessage(item._id, item.status, item.adminMessage)}
                                    >
                                        Send
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteComplaint(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComplaintList;