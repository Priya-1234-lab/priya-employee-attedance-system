🚀 Employee Attendance Management System (MERN)

A full-stack Employee Attendance Management System built using the MERN Stack (MongoDB, Express, React, Node.js).
This project enables employees to check in/check out, view attendance history, and track working hours.
Managers have separate role-based access with a dedicated dashboard.

📌 Features
👨‍💼 Employee Module

Secure login

Check-In

Check-Out

Auto calculation of total working hours

Late marking (after 9:15 AM)

Monthly summary

Total days present

Total hours

Late days

Attendance history

Month-wise filter

👩‍💼 Manager Module

Manager login

Redirected to Manager Dashboard
(You can add more manager features later)

🗄️ Backend Features

Node.js + Express REST APIs

MongoDB database with Mongoose

User model & Attendance model

Controllers + Routes structure

Error handling

Nodemon for development

🎨 Frontend Features

React functional components

React Router for navigation

Axios for API calls

Clean, simple UI with inline styling

LocalStorage for session handling

🛠️ Tech Stack
Frontend

React.js

Axios

React Router DOM

Backend

Node.js

Express.js

Mongoose

Nodemon

Database

MongoDB (MongoDB Atlas)

📁 Folder Structure
employee-attendance-system/
│
├── client/               # React Frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── server/               # Node Backend
    ├── controllers/
    ├── models/
    ├── routes/
    ├── config/db.js
    ├── index.js
    └── package.json

▶️ How to Run the Project
🔧 1. Clone the Repository
git clone <repo-url>
cd employee-attendance-system

🖥️ 2. Start Backend Server
cd server
npm install
npm run dev


Backend runs on:
👉 http://localhost:5000

🌐 3. Start Frontend (React)
cd client
npm install
npm start


Frontend runs on:
👉 http://localhost:3000

🗂️ MongoDB Collections
Users Collection
{
  "name": "Priya",
  "email": "priya@example.com",
  "password": "Priya123",
  "role": "employee",
  "employeeId": "EMP001",
  "department": "IT"
}

Attendance Collection
{
  "user": "<User ObjectId>",
  "date": "2025-11-30",
  "checkInTime": "2025-11-30T09:55",
  "checkOutTime": "2025-11-30T17:32",
  "totalHours": 7.61,
  "status": "present / late"
}

📊 Monthly Summary (Logic)

Total Days = number of attendance records in current month

Total Hours = sum of totalHours field

Late Days = records where status = late

🛠️ API Endpoints
POST /api/auth/login

User login
Returns role (employee/manager)

POST /api/attendance/checkin

Check-in for today

POST /api/attendance/checkout

Check-out for today

GET /api/attendance/history

Fetch attendance history
Query: ?email=priya@example.com

🌟 Future Enhancements

Admin Dashboard

Approve/reject leaves

Export CSV reports

Charts & analytics

Salary calculation based on total hours

Notifications & email alerts

❤️ Author

Priya Naik
B.E CSE — Shree Devi Institute of Technology
Full Stack Developer (MERN)
