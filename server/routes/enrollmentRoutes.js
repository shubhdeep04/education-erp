import express from "express"
import {
  enrollCourse,
  getMyEnrollments,
  getAllEnrollments
} from "../controllers/enrollmentController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/enroll",  protect, enrollCourse)       // Enroll karo
router.get("/mine",     protect, getMyEnrollments)   // Meri enrollments
router.get("/all",      protect, getAllEnrollments)   // Admin — sab

export default router