import "./Register.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

function Register() {
  return (
    <div>
      <Header />
      <div className="register-page">
        <div className="register-container">
          <h1 className="register-title">Register</h1>
          <form className="register-form">
            <label>Username:</label>
            <input type="text" placeholder="Username" />
            <label>Email:</label>
            <input type="email" placeholder="Email" />
            <label>Password:</label>
            <input type="password" placeholder="Password" />
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
