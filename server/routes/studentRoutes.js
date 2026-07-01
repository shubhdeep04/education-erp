// 
// import express from "express";

// const router = express.Router();
// router.get("/stats", (req, res) => {
//   res.json({
//     success: true,
//     data: {
//       enrolledCourses: 5,
//       attendance: 92,
//       lastGrade: "A",
//       lastSubject: "Mathematics",
//       pendingAssignments: 2,
//     },
//   });
// });

// router.get("/courses", (req, res) => {
//   res.json({
//     success: true,
//     data: [
//       {
//         name: "Mathematics",
//         teacher: "Mr. Sharma",
//         duration: "6 Months",
//         progress: 75,
//         status: "Active",
//       },
//       {
//         name: "Physics",
//         teacher: "Mr. Verma",
//         duration: "6 Months",
//         progress: 60,
//         status: "Active",
//       },
//     ],
//   });
// });

// router.get("/schedule", (req, res) => {
//   res.json({
//     success: true,
//     data: [
//       {
//         day: "Monday",
//         time: "10:00 AM",
//         subject: "Mathematics",
//         teacher: "Mr. Sharma",
//         room: "101",
//       },
//     ],
//   });
// });

// router.get("/attendance", (req, res) => {
//   res.json({
//     success: true,
//     data: {
//       summary: {
//         total: 100,
//         present: 92,
//         absent: 8,
//       },
//       records: [
//         {
//           subject: "Mathematics",
//           total: 40,
//           present: 38,
//           absent: 2,
//         },
//         {
//           subject: "Physics",
//           total: 60,
//           present: 54,
//           absent: 6,
//         },
//       ],
//     },
//   });
// });

// router.get("/grades", (req, res) => {
//   res.json({
//     success: true,
//     data: [
//       {
//         subject: "Mathematics",
//         teacher: "Mr. Sharma",
//         marks: 88,
//         maxMarks: 100,
//         grade: "A",
//         result: "Pass",
//       },
//       {
//         subject: "Physics",
//         teacher: "Mr. Verma",
//         marks: 82,
//         maxMarks: 100,
//         grade: "B+",
//         result: "Pass",
//       },
//     ],
//   });
// });

// router.get("/assignments", (req, res) => {
//   res.json({
//     success: true,
//     data: [
//       {
//         title: "Algebra Assignment",
//         subject: "Mathematics",
//         teacher: "Mr. Sharma",
//         dueDate: "10 Jun 2026",
//         status: "Pending",
//       },
//     ],
//   });
// });

// router.get("/fees", (req, res) => {
//   res.json({
//     success: true,
//     data: {
//       totalFee: 50000,
//       paidAmount: 35000,
//       dueAmount: 15000,
//       nextDueDate: "15 Jun 2026",
//       history: [
//         {
//           date: "01 May 2026",
//           amount: 20000,
//           mode: "UPI",
//           receipt: "R001",
//           status: "Paid",
//         },
//       ],
//     },
//   });
// });

// router.get("/profile", (req, res) => {
//   res.json({
//     success: true,
//     data: {
//       name: "Student Name",
//       email: "student@example.com",
//       phone: "9876543210",
//       rollNo: "ST001",
//       course: "Science",
//       batch: "2026",
//       status: "Active",
//       joinDate: "01 Jan 2026",
//       guardian: "Father Name",
//       guardianPhone: "9999999999",
//       blood: "O+",
//       address: "Khandwa, MP",
//     },
//   });
// });
// router.get("/notices", (req, res) => {
//   res.json({
//     success: true,
//     data: [
//       {
//         title: "Holiday Notice"
//       }
//     ]
//   });
// });

// // saare routes

// export default router;



import express from "express";
import { protect, requireRole } from "../middleware/authMiddleware.js";
import {
  getStudentStats,
  getStudentProfile,
  getStudentGrades,
  getStudentAttendance,
  getStudentAssignments,
  getStudentSchedule,
  getStudentNotices,
  getStudentFees,
  getStudentCourses,
} from "../controllers/studentController.js";

const router = express.Router();

router.use(protect);
router.use(requireRole("student", "admin", "superadmin"));

router.get("/stats",       getStudentStats);
router.get("/profile",     getStudentProfile);
router.get("/grades",      getStudentGrades);
router.get("/attendance",  getStudentAttendance);
router.get("/assignments", getStudentAssignments);
router.get("/schedule",    getStudentSchedule);
router.get("/notices",     getStudentNotices);
router.get("/fees",        getStudentFees);
router.get("/courses",     getStudentCourses);

export default router;