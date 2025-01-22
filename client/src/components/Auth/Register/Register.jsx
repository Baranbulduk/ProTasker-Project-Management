import "./Register.css";

function Register() {
  return (
    <div className="register">
      <h1>Register</h1>
      <form>
        <label>Username:</label>
        <input type="text" placeholder="Username" />
        <label>Email:</label>
        <input type="email" placeholder="Email" />
        <label>Password:</label>
        <input type="password" placeholder="Password" />
        <button className="register-button" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
