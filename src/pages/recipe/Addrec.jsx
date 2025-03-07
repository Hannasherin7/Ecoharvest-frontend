import axios from 'axios';
import React, { useState } from 'react';
import NavBar from '../../Components/Layout/NavBar';
import { Link } from 'react-router-dom'; // Import Link for footer navigation

export const Addrec = () => {
    const [data, setData] = useState({
        imager: null, // Store file
        incredientsr: "",
        titler: "",
        descriptionr: "",
        typer: "Veg" // Default value for dropdown
    });

    const inputHandler = (event) => {
        const { name, value, type, files } = event.target;
        if (type === "file") {
            setData({ ...data, [name]: files[0] }); // Store file object
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const readValue = () => {
        console.log("Form Data: ", data);

        // Create FormData object to send file and other details
        const formData = new FormData();
        formData.append("imager", data.imager);
        formData.append("incredientsr", data.incredientsr);
        formData.append("titler", data.titler);
        formData.append("descriptionr", data.descriptionr);
        formData.append("typer", data.typer);

        axios.post("http://localhost:7000/addrec", formData, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        .then(response => {
            console.log(response.data);
            if (response.data.status === "success") {
                alert("Successfully added");
                setData({
                    imager: null,
                    incredientsr: "",
                    titler: "",
                    descriptionr: "",
                    typer: "Veg"
                });
            } else {
                alert("Error");
            }
        }).catch(error => {
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
                <h1 style={headerStyle}>UPLOAD YOUR RECIPE</h1>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            {/* Input fields */}
                            <div className="col-md-6">
                                <label htmlFor="imager" className="form-label">Image</label>
                                <input type="file" className="form-control" name='imager' onChange={inputHandler} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="incredientsr" className="form-label">Ingredients</label>
                                <input type="text" className="form-control" name='incredientsr' value={data.incredientsr} onChange={inputHandler} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="titler" className="form-label">Title</label>
                                <input type="text" className="form-control" name='titler' value={data.titler} onChange={inputHandler} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="descriptionr" className="form-label">Description</label>
                                <input type="text" className="form-control" name='descriptionr' value={data.descriptionr} onChange={inputHandler} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="typer" className="form-label">Type</label>
                                <select className="form-control" name="typer" value={data.typer} onChange={inputHandler}>
                                    <option value="Veg">Veg</option>
                                    <option value="Non-Veg">Non-Veg</option>
                                </select>
                            </div>
                            <div className="col-md-6">
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
