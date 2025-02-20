import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import LoadingModal from "../components/ui/LoadingModal";
import { Link } from "react-router-dom";


const Login = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState({ type: "", text: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: "", text: "" }), 5000);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });
        setLoading(true);

        try {
            const result = await loginUser(formData.email, formData.password);
            
            if (result.success) {
                localStorage.setItem("access_token", result.data.access);
                localStorage.setItem("refresh_token", result.data.refresh);
                setIsAuthenticated(true);
                showMessage("success", "✅ Login successful!");
                
                setTimeout(() => navigate("/dashboard"), 2000);
            } else {
                showMessage("error", result.error || "Login failed.");
            }
        } catch (error) {
            console.error("Login failed:", error);
            showMessage("error", "Something went wrong. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <LoadingModal loading={loading} />

            <div className="max-w-md w-full mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

                {message.text && (
                    <p className={`text-center p-2 rounded ${message.type === "error" ? "text-red-500" : "text-green-400"}`}>
                        {message.text}
                    </p>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none"
                    />
                    
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition"
                        disabled={loading}
                    >
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-300">
                    Don't have an account? 
                    <button
                        onClick={() => navigate("/register")}
                        className="text-green-400 hover:underline ml-1"
                    >
                        Sign up
                    </button>
                </p>
                <p className="mt-4 text-center">
                    <Link to="/admin-login" className="text-blue-400 hover:underline">
                    Admin Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
