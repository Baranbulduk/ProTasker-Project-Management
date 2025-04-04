import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/forgot-password",
        { email }
      );
      console.log(response.data);
      navigate(`/update-password?token=${response.data.token}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="forgot-password-page">
        <div className="forgot-password-container">
          <h1 className="forgot-password-title">Forgot Password</h1>
          <form
            className="forgot-password-form"
            onSubmit={handleForgotPassword}
          >
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="forgot-password-button" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ForgotPassword;