import { createContext, useState } from "react";
import { loginUser } from "../api"; // Import API function
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      console.log("Login successful:", data);

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      
      setUser(data.user); // Set logged-in user details
      navigate("/dashboard"); // Redirect after login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

// ADD THIS LINE 👇
export default AuthProvider;
