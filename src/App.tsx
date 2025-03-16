import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import StudentLogin from "./pages/StudentLogin";
import LecturerLogin from "./pages/LecturerLogin";
import LibrarianLogin from "./pages/LibrarianLogin";
import StudentLecturerDashboard from "./pages/studentLecturerDashboard";
import LibrarianDashboard from "./pages/LibrarianDahsboard";
import ViewRooms from "./pages/ViewRooms"
import ViewMyBookings from "./pages/ViewMyBookings";
import ManageRooms from "./pages/MangeRooms";
import ManageBookings from "./pages/ManageBookings";
import ManageUsers from "./pages/ManageUsers";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/lecturer" element={<LecturerLogin />} />
        <Route path="/login/librarian" element={<LibrarianLogin />} />
        <Route path="/dashboard" element={<StudentLecturerDashboard />} />
        <Route path="/librarian/dashboard" element={<LibrarianDashboard />} />
        <Route path="/view-rooms" element={<ViewRooms />} />
        <Route path="/my-bookings" element={<ViewMyBookings />} />
        <Route path="/manage-rooms" element={<ManageRooms />} />
        <Route path="/manage-bookings" element={<ManageBookings />} />
        <Route path="/manage-users" element={<ManageUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
