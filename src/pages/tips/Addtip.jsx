import axios from 'axios';
import React, { useState } from 'react';
import NavBar from '../../Components/Layout/NavBar';
import { Link } from 'react-router-dom'; // Import Link for footer navigation

export const Addtip = () => {
    const [data, setData] = useState({
        item: "",
        tip: "",
        imaget: null, // Store the file as an object
    });

    const inputHandler = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const fileHandler = (event) => {
        setData({ ...data, imaget: event.target.files[0] });
    };

    const readValue = () => {
        if (!data.item || !data.tip || !data.imaget) {
            alert("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("item", data.item);
        formData.append("tip", data.tip);
        formData.append("imaget", data.imaget);

        axios.post("http://localhost:7000/addtip", formData, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
            .then((response) => {
                console.log(response.data);
                if (response.data.status === "success") {
                    alert("Successfully added");
                    setData({ item: "", tip: "", imaget: null });
                } else {
                    alert("Error");
                }
            })
            .catch((error) => {
                console.log(error.message);
                alert(error.message);
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
            <NavBar />
            <div className="container mt-4">
                <h1 style={headerStyle}>Add Tip</h1> {/* Header with headerStyle applied */}
                <div className="row">
                    <div className="col col-12">
                        <div className="row g-3">
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Image</label>
                                <input type="file" className="form-control" onChange={fileHandler} />
                            </div>
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Item</label>
                                <input type="text" className="form-control" name='item' value={data.item} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Tip</label>
                                <input type="text" className="form-control" name='tip' value={data.tip} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6">
                                <br /><br />
                                <button onClick={readValue} className="btn btn-success">ADD</button>
                            </div>
                        </div>
                    </div>
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
