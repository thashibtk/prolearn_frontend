import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [editingUser, setEditingUser] = useState(null);
    const [message, setMessage] = useState("");
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [editConfirmation, setEditConfirmation] = useState(false);
    const [freezeConfirmation, setFreezeConfirmation] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);
    
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), 2000);
            return () => clearTimeout(timer); // Cleanup to prevent memory leaks
        }
    }, [message]);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            if (!token) return;

            const response = await fetch("http://127.0.0.1:8000/api/auth/admin/users/", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error("Failed to fetch users");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            setMessage("Error fetching users.");
            console.error("Error:", error);
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        if (!role) {
            setMessage("Please select a role.");
            return;
        }

        const token = localStorage.getItem("adminToken");
        if (!token) return;

        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/admin/create-user/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ full_name: fullName, email, role, password }),
            });

            if (!response.ok) throw new Error("Failed to create user");
            
            setMessage("User created successfully.");
            fetchUsers();
            resetForm();
        } catch (error) {
            setMessage("Error creating user.");
            console.error("Error:", error);
        }
    };

    const handleDeleteUser = async () => {
        if (!deleteUserId) return;
        const token = localStorage.getItem("adminToken");

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/auth/admin/delete-user/${deleteUserId}/`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) throw new Error("Failed to delete user");
            
            setMessage("User deleted successfully.");
            setDeleteUserId(null);
            fetchUsers();
        } catch (error) {
            setMessage("Error deleting user.");
            console.error("Error:", error);
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setFullName(user.full_name);
        setEmail(user.email);
        setRole(user.role);
        setIsEditing(true); // 🔥 Set editing mode ON
    };

    const handleUpdateUser = (e) => {
        e.preventDefault();
        setEditConfirmation(true); // 🔥 Show confirmation modal before updating
    };

    const confirmEditUser = async () => {
        if (!role) {
            setMessage("Please select a role.");
            return;
        }

        const token = localStorage.getItem("adminToken");
        if (!token) return;

        try {
            await fetch(`http://127.0.0.1:8000/api/auth/admin/update-user/${editingUser.id}/`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ full_name: fullName, email, role }),
            });

            setMessage("User updated successfully.");
            fetchUsers();
            resetForm();
            setEditConfirmation(false);
        } catch (error) {
            setMessage("Error updating user.");
            console.error("Error:", error);
        }
    };

    const cancelEdit = () => {
        resetForm(); // Reset form fields and exit edit mode
        setEditConfirmation(false); // Close the confirmation modal if open
    };

    const resetForm = () => {
        setEditingUser(null);
        setFullName("");
        setEmail("");
        setRole("");
        setPassword("");
        setIsEditing(false);
    };

    const toggleFreezeUser = async () => {
        if (!freezeConfirmation) return;

        try {
            const token = localStorage.getItem("adminToken");
            if (!token) return;

            const response = await fetch(`http://127.0.0.1:8000/api/auth/admin/toggle-freeze/${freezeConfirmation.id}/`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                setMessage(`User ${freezeConfirmation.is_active ? "frozen" : "unfrozen"} successfully.`);
                fetchUsers();
                setFreezeConfirmation(null);
            }
        } catch (error) {
            console.error("Error toggling freeze status:", error);
        }
    };


    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100">
    {/* Sidebar */}
    <div className="md:w-64 w-full md:block hidden">
        <AdminSidebar />
    </div>

    <div className="flex-1 p-4 md:p-6">
        <h2 className="text-2xl font-bold mb-5 text-gray-800">User Management</h2>

    
            <div className="bg-white p-5 rounded-lg shadow-md mb-6">
            {message && (
                <div className="bg-blue-500 text-white p-3 mb-3 rounded">
                    {message}
                </div>
            )}
                <h3 className="text-xl font-bold mb-4">{isEditing ? "Edit User" : "Create User"}</h3>
                <form onSubmit={isEditing ? handleUpdateUser : handleCreateUser}>
                <input type="text" placeholder="Full Name" value={fullName} className="w-full p-2 border mb-3 rounded" onChange={(e) => setFullName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} className="w-full p-2 border mb-3 rounded" onChange={(e) => setEmail(e.target.value)} required />
                <select className="w-full p-2 border mb-3 rounded" value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="">Select Role</option>
                    <option value="mentor">Mentor</option>
                    <option value="project_manager">Project Manager</option>
                </select>
                {!isEditing && (
                    <input type="password" placeholder="Password" value={password} className="w-full p-2 border mb-3 rounded" onChange={(e) => setPassword(e.target.value)} required />
                )}
                {isEditing && (
                    <button onClick={cancelEdit} className="w-full mt-3 mb-3 bg-gray-500 text-white px-4 py-2 rounded">
                    Cancel
                    </button>
                )}
                <button type="submit" className={`w-full ${isEditing ? 'bg-yellow-500' : 'bg-blue-500'} text-white p-2 rounded`}>
                    {isEditing ? "Update User" : "Create User"}
                </button>
                </form>
            </div>

            {/* Users Table */}
        <div className="bg-white p-5 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Users List</h3>
            <table className="w-full border-collapse min-w-[600px]">
                <thead>
                    <tr className="bg-gray-300 text-gray-800 text-left">
                        <th className="p-3">Full Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Role</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-t hover:bg-gray-100">
                            <td className="p-3">{user.full_name}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3 capitalize">{user.role.replace("_", " ")}</td>
                            <td className="p-3">{user.is_active ? "Active" : "Inactive"}</td>
                            <td className="p-3 flex flex-wrap justify-center space-x-2 gap-2">
                                <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => handleEditUser(user)}>Edit</button>
                                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => setDeleteUserId(user.id)}>Delete</button>
                                <button className={`${user.is_active ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white px-3 py-1 rounded-md`} onClick={() => setFreezeConfirmation(user)}>
                                    {user.is_active ? "Freeze" : "Unfreeze"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteUserId && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <p className="text-lg font-semibold">Are you sure you want to delete this user?</p>
                    <div className="mt-4 flex justify-end">
                        <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={() => setDeleteUserId(null)}>Cancel</button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDeleteUser}>Delete</button>
                    </div>
                </div>
            </div>
        )}

        {/* Edit Confirmation Modal */}
        {editConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <p className="text-lg font-semibold">Confirm edit this user?</p>
                    <div className="mt-4 flex justify-end">
                        <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={() => setEditConfirmation(false)}>Cancel</button>
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={confirmEditUser}>Confirm</button>
                    </div>
                </div>
            </div>
        )}

        {/* Freeze Confirmation Modal */}
        {freezeConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <p className="text-lg font-semibold">Are you sure you want to {freezeConfirmation.is_active ? "freeze" : "unfreeze"} this user?</p>
                    <div className="mt-4 flex justify-end">
                        <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={() => setFreezeConfirmation(null)}>Cancel</button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={toggleFreezeUser}>Confirm</button>
                    </div>
                </div>
            </div>
        )}
    </div>
</div>
    );
};

export default UserManagement;
