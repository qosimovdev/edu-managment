import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Courses from "./pages/Courses";
import Groups from "./pages/Groups";
import Payments from "./pages/Payments";
import Attendance from "./pages/Attendance";
import Login from "./pages/auth/Login";
import "./assets/css/pages.css";

function App() {
  return (
    // <Router>
    <Routes>
      {/* Login alohida route */}
      <Route path="/login" element={<Login />} />

      {/* Layout ichidagi barcha page routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} /> {/* default */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="courses" element={<Courses />} />
        <Route path="groups" element={<Groups />} />
        <Route path="payments" element={<Payments />} />
        <Route path="attendance" element={<Attendance />} />
        {/* Default fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
    // </Router>
  );
}

export default App;
