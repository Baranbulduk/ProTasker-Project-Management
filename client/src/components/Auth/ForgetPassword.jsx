import React from "react";
import "./ForgetPassword.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function ForgetPassword() {
  return (
    <div>
      <Header />
      <div className="forget-password-page">
        <div className="forget-password-container">
          <h1 className="forget-password-title">Forget Password</h1>
          <form className="forget-password-form">
            <label>Email:</label>
            <input type="email" placeholder="Email" />
            <button className="forget-password-button" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ForgetPassword;
