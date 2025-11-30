import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AttendanceHistory from "./pages/AttendanceHistory";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/attendance/history" element={<AttendanceHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
