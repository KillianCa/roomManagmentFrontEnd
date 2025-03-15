import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import StudentLogin from "./pages/StudentLogin";
import LecturerLogin from "./pages/LecturerLogin";
import LibrarianLogin from "./pages/LibrarianLogin";
import StudentLecturerDashboard from "./pages/studentLecturerDashboard";
import LibrarianDashboard from "./pages/LibrarianDahsboard";
import ViewRooms from "./pages/ViewRooms"
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
      </Routes>
    </Router>
  );
}

export default App;
