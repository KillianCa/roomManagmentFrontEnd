import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import UlImg from "../images/UL_logo.png";

const LecturerLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
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
        <h2>Lecturer Login</h2>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input type="text" placeholder="Enter username" />
          <label>Password</label>
          <input type="password" placeholder="Enter password" />
          <button type="submit">Login</button>
        </form>
      </div>

      <footer className="footer"></footer>
    </div>
  );
};

export default LecturerLogin;
