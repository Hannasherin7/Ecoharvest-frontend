import { useState } from "react";
import axios from "axios";
import NavBar from "./Layout/NavBar";
import NavSeller from "./Layout/NavSeller";

export default function CropYieldPredictor() {
    const [formData, setFormData] = useState({
        State_Name: "",
        District_Name: "",
        Crop_Year: "",
        Season: "",
        Crop: "",
        Area: ""
    });

    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Ensure Crop_Year and Area are positive numbers
        if ((name === "Crop_Year" || name === "Area") && value < 0) return;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setPrediction(null);

        try {
            const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000/predict";  // Use environment variable for flexibility
            const response = await axios.post(API_URL, formData);
            
            if (response.data && response.data.predicted_yield !== undefined) {
                setPrediction(response.data.predicted_yield);
            } else {
                throw new Error("Invalid response from server.");
            }
        } catch (err) {
            console.error("Error fetching prediction:", err);
            setError("⚠️ Failed to fetch prediction. Ensure the backend is running and accessible.");
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center p-5">
            <NavSeller/>
            <h1 className="text-2xl font-bold mb-4">🌾 Crop Yield Prediction</h1>

            <form className="grid grid-cols-2 gap-4 p-4 border rounded-lg shadow-lg bg-white" onSubmit={handleSubmit}>
                {Object.keys(formData).map((field) => (
                    <input
                        key={field}
                        type={field === "Crop_Year" || field === "Area" ? "number" : "text"}
                        name={field}
                        placeholder={field.split("_").join(" ")}
                        value={formData[field]}
                        onChange={handleChange}
                        className="p-2 border rounded-lg"
                        required
                    />
                ))}

                <button 
                    className="col-span-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" 
                    type="submit" 
                    disabled={loading}
                >
                    {loading ? "🔄 Predicting..." : "🌱 Predict Yield"}
                </button>
            </form>

            {prediction !== null && (
                <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 rounded-lg">
                    <p className="text-lg font-semibold">🌾 Predicted Yield: <strong>{prediction} tons</strong></p>
                </div>
            )}

            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}
