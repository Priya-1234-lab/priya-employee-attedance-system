const express = require("express");
const {
  checkIn,
  checkOut,
  getHistory,
} = require("../controllers/attendanceController");

const router = express.Router();

// POST /api/attendance/checkin
router.post("/checkin", checkIn);

// POST /api/attendance/checkout
router.post("/checkout", checkOut);

// GET /api/attendance/history?email=...
router.get("/history", getHistory);

module.exports = router;
