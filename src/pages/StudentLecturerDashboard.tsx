import { useNavigate } from "react-router-dom";
import UlImg from "../images/UL_logo.png";
import "../styles/Dashboard.css";
import RoomImg from "../images/room.png";
import BookingImg from "../images/booking.png";

const StudentLecturerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="logo">
          <img src={UlImg} alt="College Logo" className="logo-img" />
        </div>
        <button className="nav-button" onClick={() => navigate("/")}>
          Home
        </button>
      </header>

      <main className="main-content">
        <h1 className="title">What Would You Like To Do</h1>

        <div className="dashboard-options">
          <div
            className="dashboard-box"
            onClick={() => navigate("/view-rooms")}
          >
            <h2>View Rooms</h2>
            <img src={RoomImg} alt="Student" className="role-img" />
          </div>

          <div
            className="dashboard-box"
            onClick={() => navigate("/my-bookings")}
          >
            <h2>View My Bookings</h2>
            <img src={BookingImg} alt="Student" className="role-img" />
          </div>
        </div>
      </main>

      <footer className="footer"></footer>
    </div>
  );
};

export default StudentLecturerDashboard;
