import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("adminToken");
                if (!token) {
                    navigate("/admin-login");
                    return;
                }

                const response = await fetch("http://127.0.0.1:8000/api/auth/admin/users/", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error("Unauthorized access. Please log in again.");
                }

                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
                localStorage.removeItem("adminToken");
                navigate("/admin-login");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [navigate]);

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 p-5">
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Dashboard</h2>
                {loading ? (
                    <p className="text-gray-600">Loading users...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <>
                        <h3 className="text-xl font-bold text-gray-800">Users List</h3>
                        <div className="overflow-x-auto mt-3">
                            <table className="w-full bg-white rounded-lg shadow-md">
                                <thead>
                                    <tr className="bg-gray-300 text-gray-800">
                                        <th className="p-3 text-left">Full Name</th>
                                        <th className="p-3 text-left">Email</th>
                                        <th className="p-3 text-left">Role</th>
                                        <th className="p-3 text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? (
                                        users.map((user) => (
                                            <tr key={user.id} className="border-t hover:bg-gray-100 transition-all">
                                                <td className="p-3">{user.full_name}</td>
                                                <td className="p-3">{user.email}</td>
                                                <td className="p-3 capitalize">{user.role.replace("_", " ")}</td>
                                                <td className="p-3">
                                                    {user.is_active ? (
                                                        <span className="text-green-600 font-bold">Active</span>
                                                    ) : (
                                                        <span className="text-red-600 font-bold">Frozen</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="p-3 text-center text-gray-500">No users found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;