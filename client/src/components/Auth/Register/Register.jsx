import { useState } from "react";
import axios from "axios";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");

  const register = async (e) => {
    e.preventDefault();
    try {
      const newUser = { username, email, password, role };
      await axios.post("http://localhost:3000/auth/register", newUser);
      window.location.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="register-page">
        <div className="register-container">
          <h1 className="register-title">Register</h1>
          <form className="register-form" onSubmit={register}>
            <label>Username:</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
            <label>Role:</label>
            <select
              className="register-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option className="register-option" value="member">
                Member
              </option>
              <option className="register-option" value="manager">
                Manager
              </option>
              <option className="register-option" value="owner">
                Owner
              </option>
            </select>
            <button className="register-button" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
