import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOTP, verifyOTP } from "../api";
import LoadingModal from "../components/ui/LoadingModal";

const Register = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
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

    // Send OTP
    const handleSendOTP = async () => {
        setMessage({ type: "", text: "" });

        if (!formData.email) {
            showMessage("error", "⚠️ Please enter an email before sending OTP.");
            return;
        }

        setLoading(true);
        try {
            await sendOTP(formData.email);
            setOtpSent(true);
            setOtpVerified(false);
            setOtp("");
            showMessage("success", "✅ OTP sent to your email.");
        } catch (err) {
            showMessage("error", err.response?.data?.error || "Failed to send OTP.");
        }
        setLoading(false);
    };

    // Resend OTP
    const handleResendOTP = async () => {
        setMessage({ type: "", text: "" });
        setLoading(true);
        try {
            await sendOTP(formData.email);
            setOtp("");
            setOtpVerified(false);
            showMessage("success", "✅ OTP resent successfully.");
        } catch (err) {
            showMessage("error", err.response?.data?.error || "Failed to resend OTP.");
        }
        setLoading(false);
    };

    // Verify OTP
    const handleVerifyOTP = async () => {
        setMessage({ type: "", text: "" });
        setLoading(true);
        try {
            await verifyOTP(formData.email, otp);
            setOtpVerified(true);
            showMessage("success", "✅ OTP verified successfully.");
        } catch (err) {
            showMessage("error", err.response?.data?.error || "OTP verification failed.");
        }
        setLoading(false);
    };

    // Handle Registration
    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        if (!formData.fullname || !formData.email || !formData.password || !formData.confirmPassword) {
            showMessage("error", "⚠️ Please fill in all fields.");
            return;
        }

        if (!otpVerified) {
            showMessage("error", "⚠️ Please verify the OTP first.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            showMessage("error", "⚠️ Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/signup/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    full_name: formData.fullname,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                showMessage("success", "✅ Registration successful!");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                showMessage("error", data.error || "Registration failed.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            showMessage("error", "Something went wrong.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <LoadingModal loading={loading} />

            <div className="max-w-md w-full mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Register</h2>

                {message.text && (
                    <p className={`text-center p-2 rounded ${message.type === "error" ? "text-red-500" : "text-green-400"}`}>
                        {message.text}
                    </p>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <input type="text" name="fullname" placeholder="Full Name" onChange={handleChange} required 
                        className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none" 
                    />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required 
                        className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none" 
                    />

                    {!otpSent ? (
                        <button type="button" onClick={handleSendOTP}
                            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
                        >
                            Send OTP
                        </button>
                    ) : (
                        <>
                            <input type="text" name="otp" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} required 
                                className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none" 
                            />
                            <button type="button" onClick={handleVerifyOTP}
                                className={`w-full py-3 rounded ${otpVerified ? "bg-green-500" : "bg-yellow-500"} text-white hover:opacity-80 transition`}
                                disabled={loading || otpVerified}
                            >
                                {otpVerified ? "✅ OTP Verified" : "Verify OTP"}
                            </button>
                            <button type="button" onClick={handleResendOTP}
                                className="w-full bg-gray-500 text-white py-3 rounded hover:bg-gray-600 transition"
                                disabled={loading}
                            >
                                Resend OTP
                            </button>
                        </>
                    )}

                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none" />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none" />

                    <button type="submit" className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
