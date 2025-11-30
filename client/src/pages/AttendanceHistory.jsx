import { useEffect, useState } from "react";
import axios from "axios";

function AttendanceHistory() {
  const [records, setRecords] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const email = localStorage.getItem("employeeEmail");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/attendance/history",
          {
            params: { email },
          }
        );
        setRecords(res.data);
      } catch (err) {
        setError("Failed to load records.");
      }
    };

    fetchHistory();
  }, [email]);

  useEffect(() => {
    const filteredData = records.filter((rec) => {
      const d = new Date(rec.date);
      return d.getMonth() === parseInt(selectedMonth);
    });
    setFiltered(filteredData);
  }, [selectedMonth, records]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Attendance History</h2>

      {/* Month Filter */}
      <label style={{ marginRight: "10px" }}>
        Filter by Month:
      </label>
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        style={{ padding: "5px", marginBottom: "15px" }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <option key={i} value={i}>
            {new Date(0, i).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {filtered.length === 0 ? (
        <p>No records found for this month.</p>
      ) : (
        <table
          style={{
            marginTop: "15px",
            borderCollapse: "collapse",
            width: "100%",
            maxWidth: "700px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Date</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Check In</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Check Out</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Total Hours</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((rec) => (
              <tr key={rec._id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {new Date(rec.date).toLocaleDateString()}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {rec.checkInTime
                    ? new Date(rec.checkInTime).toLocaleTimeString()
                    : "-"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {rec.checkOutTime
                    ? new Date(rec.checkOutTime).toLocaleTimeString()
                    : "-"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {rec.totalHours ? rec.totalHours.toFixed(2) : "-"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {rec.status || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AttendanceHistory;
