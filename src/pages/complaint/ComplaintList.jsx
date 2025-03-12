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

    // Styles
    const pageStyle = {
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
    };

    const headerStyle = {
        textAlign: "center",
        margin: "20px 0",
        fontSize: "32px",
        color: "#333",
    };

    const tableStyle = {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    };

    const tableHeaderRowStyle = {
        backgroundColor: "#4CAF50",
        color: "#fff",
    };

    const tableHeaderStyle = {
        padding: "12px",
        textAlign: "left",
        borderBottom: "1px solid #ddd",
    };

    const tableRowStyle = {
        borderBottom: "1px solid #ddd",
        "&:hover": {
            backgroundColor: "#f9f9f9",
        },
    };

    const tableCellStyle = {
        padding: "12px",
        textAlign: "left",
    };

    const selectStyle = {
        padding: "5px",
        borderRadius: "5px",
        border: "1px solid #ccc",
    };

    const inputStyle = {
        padding: "5px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "100%",
    };

    const buttonStyle = {
        padding: "5px 10px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginLeft: "5px",
    };

    const deleteButtonStyle = {
        padding: "5px 10px",
        backgroundColor: "#ff4d4d",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    };

    return (
        <div style={pageStyle}>
            {/* Header */}
            <NavAdmin />

            {/* Page Title */}
            <h1 style={headerStyle}>Complaint List</h1>

            {/* Complaint Table */}
            <div style={{ overflowX: "auto" }}>
                <table style={tableStyle}>
                    <thead>
                        <tr style={tableHeaderRowStyle}>
                            <th style={tableHeaderStyle}>Name</th>
                            <th style={tableHeaderStyle}>Email</th>
                            <th style={tableHeaderStyle}>Phone Number</th>
                            <th style={tableHeaderStyle}>Complaint</th>
                            <th style={tableHeaderStyle}>Resolution Request</th>
                            <th style={tableHeaderStyle}>Status</th>
                            <th style={tableHeaderStyle}>Admin Message</th>
                            <th style={tableHeaderStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item._id} style={tableRowStyle}>
                                <td style={tableCellStyle}>{item.name}</td>
                                <td style={tableCellStyle}>{item.email}</td>
                                <td style={tableCellStyle}>{item.phoneNumber}</td>
                                <td style={tableCellStyle}>{item.complaint}</td>
                                <td style={tableCellStyle}>{item.resolutionRequest}</td>
                                <td style={tableCellStyle}>
                                    <select
                                        style={selectStyle}
                                        value={item.status}
                                        onChange={(e) => updateStatus(item._id, e.target.value, item.adminMessage)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="resolved">Resolved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </td>
                                <td style={tableCellStyle}>
                                    <input
                                        type="text"
                                        style={inputStyle}
                                        value={item.adminMessage}
                                        onChange={(e) => {
                                            const updatedData = data.map((complaint) =>
                                                complaint._id === item._id ? { ...complaint, adminMessage: e.target.value } : complaint
                                            );
                                            setData(updatedData);
                                        }}
                                    />
                                    <button
                                        style={buttonStyle}
                                        onClick={() => handleSendMessage(item._id, item.status, item.adminMessage)}
                                    >
                                        Send
                                    </button>
                                </td>
                                <td style={tableCellStyle}>
                                    <button
                                        style={deleteButtonStyle}
                                        onClick={() => deleteComplaint(item._id)}
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

export default ComplaintList;