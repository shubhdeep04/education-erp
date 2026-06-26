
import express from "express";
import {
    getTeacherStats,
    getPendingAssignments,
    deleteAssignment,
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent,

    markAttendance,
    getAttendance,
    updateAttendance,
  deleteAttendance,
   addAssignment,
    getAssignments,
    getSchedule,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    getProfile,
    updateProfile,

     addGrade,
  getGrades,
  updateGrade,
  deleteGrade,
} from "../controllers/teacherController.js";

const router = express.Router();

// Important Routes for Frontend
router.get("/stats", getTeacherStats);
router.get("/assignments/pending", getPendingAssignments);
router.get("/profile", getProfile);
router.delete("/assignments/:id",  deleteAssignment);
// Other Routes
router.get("/students", getStudents);

router.post("/attendance", markAttendance);
router.get("/attendance", getAttendance);
router.put("/attendance/:id", updateAttendance);
router.delete("/attendance/:id", deleteAttendance);


router.get("/students", getStudents);
router.post("/students", addStudent);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);



router.post("/assignments", addAssignment);
router.get("/assignments", getAssignments);
router.get("/schedule", getSchedule);
router.post("/schedule", addSchedule);
router.put("/schedule/:id", updateSchedule);
router.delete("/schedule/:id", deleteSchedule);
router.put("/profile", updateProfile);



router.post("/grade", addGrade);
router.get("/grade", getGrades);
router.put("/grade/:id", updateGrade);
router.delete("/grade/:id", deleteGrade);

export default router;