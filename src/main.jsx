import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // Ensure correct import

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App /> 
  </Router>
);
