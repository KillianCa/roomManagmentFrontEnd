import { useNavigate } from "react-router-dom";
import StudentImg from "../images/student.png";
import LecturerImg from "../images/lecturer.png";
import LibrarianImg from "../images/librarian.png";
import UlImg from "../images/UL_logo.png";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <header className="header">
        <div className="logo">
          <img src={UlImg} alt="College Logo" className="logo-img" />
        </div>

        <button className="nav-button" onClick={() => navigate("/")}>
          Home
        </button>
      </header>

      <main className="main-content">
        <h1 className="title">Please Login</h1>

        <div className="role-container">
          <div className="role-box" onClick={() => navigate("/login/student")}>
            <h2>Student</h2>
            <img src={StudentImg} alt="Student" className="role-img" />
          </div>

          <div className="role-box" onClick={() => navigate("/login/lecturer")}>
            <h2>Lecturer</h2>
            <img src={LecturerImg} alt="Lecturer" className="role-img" />
          </div>

          <div
            className="role-box"
            onClick={() => navigate("/login/librarian")}
          >
            <h2>Librarian</h2>
            <img src={LibrarianImg} alt="Librarian" className="role-img" />
          </div>
        </div>
      </main>

      <footer className="footer"></footer>
    </div>
  );
};

export default LandingPage;
