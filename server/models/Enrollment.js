import mongoose from "mongoose"

const enrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  courseId: {
    type: Number,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  courseBadge: String,
  courseFee:   String,
  enrolledAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true })

// Ek student ek course mein sirf ek baar enroll ho sake
enrollmentSchema.index({ student: 1, courseId: 1 }, { unique: true })

export default mongoose.model("Enrollment", enrollmentSchema)