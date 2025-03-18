import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = { email, password };
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        user
      );

      const { token, user: userData } = response.data;
      localStorage.setItem("token", token);
      setUser(userData);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="login-page">
        <div className="login-container">
          <h1 className="login-title">Login</h1>
          <form className="login-form" onSubmit={handleLogin}>
            <label>Email:</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password:</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a className="forgot-password-link" href="/forgot-password">
              Forgot Password?
            </a>
            <button className="login-button" type="submit">
              Login
            </button>
            <div className="register-link-container">
              <p>
                Don't have an account?{" "}
                <a className="register-link" href="/register">
                  Register here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
