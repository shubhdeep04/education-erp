// import express from "express";

// const router = express.Router();

// router.get("/dashboard", (req, res) => {
//   res.json({
//     success: true,
//     data: {
//       totalStudents: 500,
//       totalTeachers: 25,
//       totalCourses: 15,
//       totalRevenue: 2500000,
//     },
//   });
// });

// router.get("/students", (req, res) => {
//   res.json({
//     success: true,
//     data: [
//       {
//         id: 1,
//         name: "Rahul",
//         course: "Science",
//       },
//     ],
//   });
// });

// router.get("/teachers", (req, res) => {
//   res.json({
//     success: true,
//     data: [
//       {
//         id: 1,
//         name: "Mr. Sharma",
//         subject: "Maths",
//       },
//     ],
//   });
// });

// router.get("/courses", (req, res) => {
//   res.json({
//     success: true,
//     data: [
//       {
//         id: 1,
//         name: "Mathematics",
//       },
//     ],
//   });
// });

// export default router;






import express from "express";
import { protect, requireRole } from "../middleware/authMiddleware.js";
import {
  getAdminStats,
  getStudents, addStudent, updateStudent, deleteStudent,
  getTeachers, addTeacher, updateTeacher, deleteTeacher,
  getGrades,
  getAttendance,
  getAssignments,
  getNotices, addNotice, deleteNotice,
} from "../controllers/adminController.js";

const router = express.Router();

// All admin routes require a valid token + admin role
router.use(protect);
router.use(requireRole("admin", "superadmin"));

router.get("/stats", getAdminStats);

// Students
router.get("/students",       getStudents);
router.post("/students",      addStudent);
router.put("/students/:id",   updateStudent);
router.delete("/students/:id",deleteStudent);

// Teachers
router.get("/teachers",        getTeachers);
router.post("/teachers",       addTeacher);
router.put("/teachers/:id",    updateTeacher);
router.delete("/teachers/:id", deleteTeacher);

// View only
router.get("/grades",      getGrades);
router.get("/attendance",  getAttendance);
router.get("/assignments", getAssignments);

// Notices
router.get("/notices",        getNotices);
router.post("/notices",       addNotice);
router.delete("/notices/:id", deleteNotice);

export default router;