import Enrollment from "../models/Enrollment.js"

// Enroll karo
export const enrollCourse = async (req, res) => {
  try {
    const { courseId, courseName, courseBadge, courseFee } = req.body
    const studentId = req.user.id

    // Pehle se enrolled hai?
    const existing = await Enrollment.findOne({ student: studentId, courseId })
    if (existing) {
      return res.status(400).json({ success: false, message: "Already enrolled in this course" })
    }

    const enrollment = await Enrollment.create({
      student:     studentId,
      courseId,
      courseName,
      courseBadge,
      courseFee
    })

    res.status(201).json({ success: true, message: "Enrolled successfully!", enrollment })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Server Error" })
  }
}

// Is student ke enrolled courses
export const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.id })
    res.status(200).json({ success: true, enrollments })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" })
  }
}

// Admin — saare enrollments
export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment
      .find()
      .populate("student", "name email role")
      .sort({ enrolledAt: -1 })
    res.status(200).json({ success: true, enrollments })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" })
  }
}