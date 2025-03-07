import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        pname: '',
        discription: '',
        price: 0,
        quantity: 0,
        category: '',
        details: '',
        image: '',
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:7000/getproduct/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
                alert("Failed to fetch product details.");
            }
        };

        fetchProduct();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:7000/updateproduct/${id}`, product);
            if (response.data.status === "success") {
                alert("Product updated successfully!");
                navigate("/soldproducts"); // Redirect to the sold products page
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update the product.");
        }
    };

    return (
        <div>
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Product Name:
                    <input
                        type="text"
                        name="pname"
                        value={product.pname}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        name="discription"
                        value={product.discription}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Quantity:
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Category:
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Details:
                    <input
                        type="text"
                        name="details"
                        value={product.details}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Image URL:
                    <input
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default EditProduct;