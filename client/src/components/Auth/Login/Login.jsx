import "./Login.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

function Login() {
  return (
    <div>
      <Header />
      <div className="login-page">
        <div className="login-container">
          <h1 className="login-title">Login</h1>
          <form className="login-form">
            <label>Email:</label>
            <input type="email" placeholder="Email" />
            <label>Password:</label>
            <input type="password" placeholder="Password" />
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
