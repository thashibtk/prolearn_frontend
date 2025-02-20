import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ setIsAdminAuthenticated }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // ✅ Check if admin is authenticated on mount
    useEffect(() => {
        const checkAdminAuth = async () => {
            const token = localStorage.getItem("adminToken");
            if (token) {
                try {
                    const response = await fetch("http://127.0.0.1:8000/api/auth/admin/profile/", {
                        method: "GET",
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    if (response.ok) {
                        setIsAdminAuthenticated(true);
                        navigate("/admin-dashboard");
                    } else {
                        localStorage.removeItem("adminToken"); // Remove invalid token
                    }
                } catch (error) {
                    console.error("Auth check failed:", error);
                    localStorage.removeItem("adminToken");
                }
            }
        };

        checkAdminAuth();
    }, [navigate, setIsAdminAuthenticated]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/admin-login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("Response Data:", data); // Debugging

            if (response.ok && data.user?.role === "admin") {
                localStorage.setItem("adminToken", data.tokens.access);
                setIsAdminAuthenticated(true);
                navigate("/admin-dashboard");
            } else {
                setError("Access denied. Only admins can log in.");
            }
        } catch (err) {
            console.error("Error:", err);
            setError("Something went wrong.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Admin Email"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 mb-3 bg-gray-700 border border-gray-600 rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 mb-3 bg-gray-700 border border-gray-600 rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
