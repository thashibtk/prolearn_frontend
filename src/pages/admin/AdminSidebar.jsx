import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            {/* Sidebar Container */}
            <div className="flex">
                {/* Toggle Button (Always Visible on Mobile) */}
                <button
                    className="fixed top-4 left-4 z-50 md:hidden bg-gray-800 text-white p-2 rounded"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>

                {/* Sidebar */}
                <div
                    className={`fixed md:static top-0 left-0 h-screen w-64 bg-gray-800 text-white p-5 transform ${
                        isOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
                >
                    <h2 className="text-2xl font-bold mb-5">Admin Panel</h2>
                    <ul>
                        <li
                            className={`py-2 cursor-pointer ${
                                location.pathname === "/admin-dashboard"
                                    ? "text-blue-400"
                                    : "hover:text-gray-300"
                            }`}
                            onClick={() => {
                                navigate("/admin-dashboard");
                                setIsOpen(false); // Close sidebar on mobile
                            }}
                        >
                            Dashboard
                        </li>
                        <li
                            className={`py-2 cursor-pointer ${
                                location.pathname === "/admin/user-management"
                                    ? "text-blue-400"
                                    : "hover:text-gray-300"
                            }`}
                            onClick={() => {
                                navigate("/admin/user-management");
                                setIsOpen(false); // Close sidebar on mobile
                            }}
                        >
                            User Management
                        </li>
                        <li
                            className="py-2 cursor-pointer text-red-500 hover:text-red-400"
                            onClick={() => {
                                localStorage.removeItem("adminToken");
                                navigate("/admin-login");
                                setIsOpen(false); // Close sidebar on mobile
                            }}
                        >
                            Logout
                        </li>
                    </ul>
                </div>

                {/* Overlay for mobile */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
                        onClick={() => setIsOpen(false)}
                    ></div>
                )}
            </div>
        </>
    );
};

export default AdminSidebar;
