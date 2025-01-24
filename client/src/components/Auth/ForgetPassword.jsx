import React from "react";
import "./ForgetPassword.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


function ForgetPassword() {
    return (
        <div>
            <Header />
            <h1>Forget Password</h1>
            <form>
                <label>Enter your Email:</label>
                <input type="email" placeholder="current email"></input>
            </form>
            <button>Submit</button>
            <Footer />
        </div>
    );
}

export default ForgetPassword;  