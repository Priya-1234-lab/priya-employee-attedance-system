const Attendance = require("../models/Attendance");
const User = require("../models/User");

// POST /api/attendance/checkin
const checkIn = async (req, res) => {
  try {
    const { email } = req.body;

    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0, 0, 0
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23, 59, 59
    );

    // check if record exists for today
    let attendance = await Attendance.findOne({
      user: user._id,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    const now = new Date();

    // ⭐ Late Logic: mark status based on check-in time
    const checkInHour = now.getHours();
    const checkInMinute = now.getMinutes();

    // Default status = present
    let status = "present";

    // If checked in after 9:15 AM → late
    if (checkInHour > 9 || (checkInHour === 9 && checkInMinute > 15)) {
      status = "late";
    }

    if (!attendance) {
      attendance = new Attendance({
        user: user._id,
        date: today,
        checkInTime: now,
        status: status,
      });
    } else {
      attendance.checkInTime = now;
      attendance.status = status;
    }

    await attendance.save();

    res.json({
      message: "Checked in successfully",
      checkInTime: attendance.checkInTime,
      status: attendance.status,
    });
  } catch (error) {
    console.error("Check-in error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/attendance/checkout
const checkOut = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0, 0, 0
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23, 59, 59
    );

    const attendance = await Attendance.findOne({
      user: user._id,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (!attendance || !attendance.checkInTime) {
      return res
        .status(400)
        .json({ message: "No check-in found for today" });
    }

    const now = new Date();
    attendance.checkOutTime = now;

    const diffMs = now - attendance.checkInTime;
    attendance.totalHours = diffMs / (1000 * 60 * 60); // convert ms to hours

    await attendance.save();

    res.json({
      message: "Checked out successfully",
      checkOutTime: attendance.checkOutTime,
      totalHours: attendance.totalHours,
      status: attendance.status,
    });
  } catch (error) {
    console.error("Check-out error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/attendance/history
const getHistory = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const records = await Attendance.find({ user: user._id }).sort({
      date: -1,
    });

    res.json(records);
  } catch (error) {
    console.error("History error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { checkIn, checkOut, getHistory };
