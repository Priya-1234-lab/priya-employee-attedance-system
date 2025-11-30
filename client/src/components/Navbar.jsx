import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        background: "#f5f5f5",
        padding: "10px 20px",
        display: "flex",
        gap: "20px",
        borderBottom: "1px solid #ddd",
        marginBottom: "10px"
      }}
    >
      <Link to="/login">Login</Link>
      <Link to="/employee/dashboard">Dashboard</Link>
      <Link to="/attendance/history">Attendance History</Link>
    </div>
  );
}

export default Navbar;
