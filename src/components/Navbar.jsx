import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogIn, User, LogOut } from "lucide-react";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setIsAuthenticated(false);  // ✅ Updates Navbar instantly
    };

    return (
        <nav className="bg-[#0D1B2A] text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="text-2xl font-bold text-green-400">
                        ProLearn
                    </Link>

                    <div className="hidden md:flex space-x-6">
                        <Link to="/" className="hover:text-green-400">Home</Link>
                        <Link to="/courses" className="hover:text-green-400">Courses</Link>
                        <Link to="/about" className="hover:text-green-400">About</Link>
                        <Link to="/contact" className="hover:text-green-400">Contact</Link>

                        {isAuthenticated ? (
                            <>
                                <Link 
                                    to="/profile" 
                                    className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition"
                                >
                                    <User size={18} />
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition ml-2"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link 
                                to="/login" 
                                className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition"
                            >
                                <LogIn size={18} />
                                Login
                            </Link>
                        )}
                    </div>

                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
