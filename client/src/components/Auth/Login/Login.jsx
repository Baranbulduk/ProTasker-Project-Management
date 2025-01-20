import "./Login.css";

function Login() {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <label>Email:</label>
          <input type="email" placeholder="Email" />
          <label>Password:</label>
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
  
  export default Login;
  