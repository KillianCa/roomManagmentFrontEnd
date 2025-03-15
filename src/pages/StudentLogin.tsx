import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import UlImg from "../images/UL_logo.png";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    if (username !== "studentUser" || password !== "studentPass") {
      setError("Invalid credentials. Please try again.");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <header className="header">
        <div className="logo">
          <img src={UlImg} alt="College Logo" className="logo-img" />
        </div>

        <button className="nav-button" onClick={() => navigate("/")}>
          Home
        </button>
      </header>
      <div className="login-box">
        <h2>Student Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button type="submit">Login</button>
        </form>
      </div>

      <footer className="footer"></footer>
    </div>
  );
};

export default StudentLogin;
