import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import UserManagement from "./pages/admin/UserManagement";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);


    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("access_token");
            setIsAuthenticated(!!token);
    
            const adminToken = localStorage.getItem("adminToken");
            setIsAdminAuthenticated(!!adminToken);  // ✅ Persist Admin Authentication
        };
    
        checkAuth();
    
        window.addEventListener("storage", checkAuth);
        return () => window.removeEventListener("storage", checkAuth);
    }, []);
    

    return (
        <AuthProvider>
            <div className="flex flex-col min-h-screen">
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
                <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/admin-login" element={<AdminLogin setIsAdminAuthenticated={setIsAdminAuthenticated} />} />
                    <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />

                    {/* Protected User Dashboard */}
                    <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                        <Route path="/dashboard" element={<Dashboard setIsAuthenticated={setIsAuthenticated} />} />
                    </Route>

                    {/* ✅ Fixed: Protected Admin Dashboard */}
                    <Route element={<ProtectedAdminRoute isAdminAuthenticated={isAdminAuthenticated} />}>
                        <Route path="/admin-dashboard" element={<AdminDashboard setIsAdminAuthenticated={setIsAdminAuthenticated} />} />
                        <Route path="/admin/user-management" element={<UserManagement setIsAdminAuthenticated={setIsAdminAuthenticated} />} />
                    </Route>
                </Routes>

                </main>
                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;
