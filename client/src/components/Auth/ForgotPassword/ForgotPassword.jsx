import React from "react";
import "./ForgotPassword.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

function ForgotPassword() {
  return (
    <div>
      <Header />
      <div className="forgot-password-page">
        <div className="forgot-password-container">
          <h1 className="forgot-password-title">Forgot Password</h1>
          <form className="forgot-password-form">
            <label>Email:</label>
            <input type="email" placeholder="Email" />
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
