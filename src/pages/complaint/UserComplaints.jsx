import React, { useEffect, useState } from "react";
import axios from "axios";

const UserComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [editingComplaintId, setEditingComplaintId] = useState(null);
    const [editedComplaint, setEditedComplaint] = useState({
        description: "",
        category: "",
        resolutionRequest: "",
        evidence: null, // For storing the new image file
    });

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get("http://localhost:7000/user-complaints", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setComplaints(response.data.complaints);
            } catch (error) {
                console.error("Error fetching complaints:", error);
            }
        };

        fetchComplaints();
    }, []);

    const handleEditClick = (complaint) => {
        setEditingComplaintId(complaint._id);
        setEditedComplaint({
            description: complaint.description,
            category: complaint.category,
            resolutionRequest: complaint.resolutionRequest,
            evidence: null, // Reset the evidence file when editing starts
        });
    };

    const handleSaveClick = async (complaintId) => {
        const formData = new FormData();
        formData.append("complaintId", complaintId);
        formData.append("description", editedComplaint.description);
        formData.append("category", editedComplaint.category);
        formData.append("resolutionRequest", editedComplaint.resolutionRequest);

        // Append the new evidence file if it exists
        if (editedComplaint.evidence) {
            formData.append("evidence", editedComplaint.evidence);
        }

        try {
            const response = await axios.post(
                "http://localhost:7000/update-complaint",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.message === "Complaint updated successfully") {
                setComplaints((prevComplaints) =>
                    prevComplaints.map((complaint) =>
                        complaint._id === complaintId
                            ? { ...complaint, ...response.data.complaint }
                            : complaint
                    )
                );
                setEditingComplaintId(null);
            }
        } catch (error) {
            console.error("Error updating complaint:", error);
        }
    };

    const handleCancelEdit = () => {
        setEditingComplaintId(null); // Exit edit mode
        setEditedComplaint({
            description: "",
            category: "",
            resolutionRequest: "",
            evidence: null,
        });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Your Complaints</h1>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f2f2f2" }}>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Description</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Category</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Resolution Request</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Seller Response</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Evidence</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {complaints.map((complaint) => (
                        <tr key={complaint._id} style={{ borderBottom: "1px solid #ddd" }}>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                {editingComplaintId === complaint._id ? (
                                    <textarea
                                        value={editedComplaint.description}
                                        onChange={(e) =>
                                            setEditedComplaint({
                                                ...editedComplaint,
                                                description: e.target.value,
                                            })
                                        }
                                        style={{ width: "100%", padding: "5px" }}
                                    />
                                ) : (
                                    complaint.description
                                )}
                            </td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                {editingComplaintId === complaint._id ? (
                                    <select
                                        value={editedComplaint.category}
                                        onChange={(e) =>
                                            setEditedComplaint({
                                                ...editedComplaint,
                                                category: e.target.value,
                                            })
                                        }
                                        style={{ width: "100%", padding: "5px" }}
                                    >
                                        <option value="Damaged Product">Damaged Product</option>
                                        <option value="Late Delivery">Late Delivery</option>
                                        <option value="Wrong Product">Wrong Product</option>
                                        <option value="Poor Quality">Poor Quality</option>
                                        <option value="Missing Items">Missing Items</option>
                                        <option value="Others">Others</option>
                                    </select>
                                ) : (
                                    complaint.category
                                )}
                            </td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                {editingComplaintId === complaint._id ? (
                                    <select
                                        value={editedComplaint.resolutionRequest}
                                        onChange={(e) =>
                                            setEditedComplaint({
                                                ...editedComplaint,
                                                resolutionRequest: e.target.value,
                                            })
                                        }
                                        style={{ width: "100%", padding: "5px" }}
                                    >
                                        <option value="Replacement">Replacement</option>
                                        <option value="Refund">Refund</option>
                                        <option value="Return">Return</option>
                                        <option value="Exchange">Exchange</option>
                                        <option value="Other">Other</option>
                                    </select>
                                ) : (
                                    complaint.resolutionRequest
                                )}
                            </td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                {complaint.status}
                            </td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                {complaint.sellerResponse || "No response yet"}
                            </td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                {editingComplaintId === complaint._id ? (
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            setEditedComplaint({
                                                ...editedComplaint,
                                                evidence: e.target.files[0],
                                            })
                                        }
                                    />
                                ) : (
                                    complaint.evidence && (
                                        <img
                                            src={`http://localhost:7000/${complaint.evidence}`}
                                            alt="Evidence"
                                            style={{ width: "100px", height: "auto" }}
                                        />
                                    )
                                )}
                            </td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                {editingComplaintId === complaint._id ? (
                                    <div style={{ display: "flex", gap: "5px" }}>
                                        <button
                                            onClick={() => handleSaveClick(complaint._id)}
                                            style={{
                                                backgroundColor: "#4CAF50",
                                                color: "white",
                                                border: "none",
                                                padding: "5px 10px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            style={{
                                                backgroundColor: "#f44336",
                                                color: "white",
                                                border: "none",
                                                padding: "5px 10px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleEditClick(complaint)}
                                        style={{
                                            backgroundColor: "#ff5722",
                                            color: "white",
                                            border: "none",
                                            padding: "5px 10px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="7" style={{ textAlign: "center", padding: "10px" }}>
                            Total Complaints: {complaints.length}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default UserComplaints;