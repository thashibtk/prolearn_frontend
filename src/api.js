import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/auth"; // Your Django backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// Register a new user
export const registerUser = async (fullName, email, password) => {
  return api.post("/register/", { full_name: fullName, email, password });
};

// Login user
export const loginUser = async (email, password) => {
  try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", { email, password });

      if (response.status === 200) {
          return { success: true, data: response.data };
      }
  } catch (error) {
      return { success: false, error: error.response?.data?.detail || "Invalid credentials" };
  }
};
export const fetchDashboard = async () => {
  return axios.get(`${API_URL}dashboard/`, getAuthHeaders());
};

// Send OTP
export const sendOTP = async (email) => {
  return api.post("/otp/send/", { email });
};

// Verify OTP
export const verifyOTP = async (email, otp) => {
  return api.post("/otp/verify/", { email, otp_code: otp });
};

export default api;
