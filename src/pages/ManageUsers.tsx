import { useNavigate } from "react-router-dom";
import "../styles/ManageUsers.css";
import UlImg from "../images/UL_logo.png";

const ManageUsers = () => {
  const navigate = useNavigate();

  return (
    <div className="manage-users-container">
      <header className="header">
        <img src={UlImg} alt="College Logo" className="logo" />
        <button className="nav-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </header>

      <h1 className="page-title">Manage Users</h1>

      <footer className="footer"></footer>
    </div>
  );
};

export default ManageUsers;
