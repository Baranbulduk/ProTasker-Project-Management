import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import "./UpdatePassword.css";

function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");

    console.log("Extracted token:", urlToken);
    if (urlToken) {
      setToken(urlToken);
    } else {
      console.log("Invalid or missing token");
    }
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    if (!token) {
      console.log("Invalid or missing token");
      return;
    }
    try {
      await axios.post("http://localhost:3000/auth/update-password", {
        password,
        token,
      });
      console.log("Password updated successfully! Redirecting to login...");
      navigate("/login");
    } catch (error) {
      console.log("Failed to update password. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="update-password-page">
        <div className="update-password-container">
          <h1 className="update-password-title">Update Password</h1>
          <form
            className="update-password-form"
            onSubmit={handleUpdatePassword}
          >
            <label>New Password:</label>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Confirm Password:</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="update-password-button" type="submit">
              Update Password
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UpdatePassword;
