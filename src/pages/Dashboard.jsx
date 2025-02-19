import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("access_token"); // ✅ Use correct token name
        if (!token) {
            navigate("/login");
        } else {
            // Replace with actual user API call if backend supports it
            setUserEmail(localStorage.getItem("user_email") || "User");
        }
        setLoading(false);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_email");
        setIsAuthenticated(false);  // ✅ Ensure this is passed as a prop
        navigate("/login");
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to Dashboard</h1>
            <p className="text-lg text-gray-300 mb-6">Hello, {userEmail} 👋</p>

            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition"
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
