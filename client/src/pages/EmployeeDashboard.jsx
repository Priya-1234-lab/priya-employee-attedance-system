import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function EmployeeDashboard() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [summary, setSummary] = useState({
    totalDays: 0,
    totalHours: 0,
    lateDays: 0,
  });

  const location = useLocation();
  const navigate = useNavigate();

  const storedEmail = localStorage.getItem("employeeEmail");
  const userEmail = location.state?.email || storedEmail || "User";

  const today = new Date().toLocaleDateString();

  const fetchMonthlySummary = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/attendance/history",
        {
          params: { email: userEmail },
        }
      );

      const records = res.data || [];
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      // Filter only records of current month
      const thisMonthRecords = records.filter((rec) => {
        const d = new Date(rec.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      });

      const totalDays = thisMonthRecords.length;
      const totalHours = thisMonthRecords.reduce(
        (sum, rec) => sum + (rec.totalHours || 0),
        0
      );
      const lateDays = thisMonthRecords.filter(
        (rec) => rec.status === "late"
      ).length;

      setSummary({
        totalDays,
        totalHours,
        lateDays,
      });
    } catch (err) {
      console.error("Summary fetch error:", err);
    }
  };

  useEffect(() => {
    if (userEmail && userEmail !== "User") {
      fetchMonthlySummary();
    }
    // eslint-disable-next-line
  }, [userEmail]);

  const handleCheckIn = async () => {
    setMessage("");
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/attendance/checkin",
        { email: userEmail }
      );

      const time = new Date(res.data.checkInTime).toLocaleTimeString();
      setMessage(`Checked in successfully at ${time}`);

      // Refresh summary after check-in
      fetchMonthlySummary();
    } catch (err) {
      setError(
        err.response?.data?.message || "Check-in failed. Please try again."
      );
    }
  };

  const handleCheckOut = async () => {
    setMessage("");
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/attendance/checkout",
        { email: userEmail }
      );

      const time = new Date(res.data.checkOutTime).toLocaleTimeString();
      const hours = res.data.totalHours?.toFixed(2);
      setMessage(`Checked out at ${time}. Total hours: ${hours}`);

      // Refresh summary after check-out
      fetchMonthlySummary();
    } catch (err) {
      setError(
        err.response?.data?.message || "Check-out failed. Please try again."
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("employeeEmail");
    navigate("/login");
  };

  const goToHistory = () => {
    navigate("/attendance/history");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Dashboard</h2>

      <button
        onClick={handleLogout}
        style={{
          float: "right",
          padding: "6px 12px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <p style={{ fontWeight: "bold" }}>Welcome, {userEmail}!</p>
      <p style={{ fontWeight: "bold" }}>📅 Date: {today}</p>

      {/* ⭐ Monthly Summary Card */}
      <div
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          padding: "10px",
          border: "1px solid #ccc",
          width: "340px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold" }}>📊 This Month Summary</p>
        <p style={{ margin: "4px 0" }}>
          ✅ Days Present: {summary.totalDays}
        </p>
        <p style={{ margin: "4px 0" }}>
          ⏱ Total Hours: {summary.totalHours.toFixed(2)}
        </p>
        <p style={{ margin: "4px 0" }}>⚠ Late Days: {summary.lateDays}</p>
      </div>

      <div
        style={{
          marginTop: "10px",
          padding: "15px",
          border: "1px solid #ccc",
          width: "340px",
        }}
      >
        <p>
          <strong>Today's Attendance</strong>
        </p>

        <button
          onClick={handleCheckIn}
          style={{
            padding: "6px 12px",
            marginRight: "10px",
          }}
        >
          Check In
        </button>

        <button
          onClick={handleCheckOut}
          style={{
            padding: "6px 12px",
          }}
        >
          Check Out
        </button>

        {message && (
          <p style={{ marginTop: "10px", color: "green" }}>{message}</p>
        )}
        {error && (
          <p style={{ marginTop: "10px", color: "red" }}>{error}</p>
        )}

        <button
          onClick={goToHistory}
          style={{
            marginTop: "15px",
            padding: "6px 12px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          View Attendance History
        </button>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
