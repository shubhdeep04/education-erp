import mongoose from "mongoose";

// ── Attendance Schema ─────────────────────────────────────────
export const attendanceSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    subject: String,
    batch: String,
    students: [
      {
        id: String,
        status: { type: String, enum: ["Present", "Absent", "Late"], default: "Present" },
      },
    ],
    present: { type: Number, default: 0 },
    absent: { type: Number, default: 0 },
    late: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ── Grade Schema ──────────────────────────────────────────────
export const gradeSchema = new mongoose.Schema(
  {
    student: { type: String, required: true },
    subject: String,
    exam: String,
    marks: Number,
    maxMarks: { type: Number, default: 100 },
    grade: String,
  },
  { timestamps: true }
);

// ── Assignment Schema ─────────────────────────────────────────
export const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: String,
    batch: String,
    dueDate: String,
    description: String,
    status: { type: String, default: "Active" },
    submissionsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ── Schedule Schema ───────────────────────────────────────────
export const scheduleSchema = new mongoose.Schema(
  {
    day: { type: String, required: true },
    subject: String,
    batch: String,
    room: String,
    startTime: String,
    endTime: String,
    teacher: String,
  },
  { timestamps: true }
);

// ── Teacher Profile Schema ────────────────────────────────────
export const teacherProfileSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    subject: String,
    qualification: String,
    experience: Number,
    address: String,
    employeeId: String,
    department: String,
    subjects: String,
    status: { type: String, default: "Active" },
  },
  { timestamps: true }
);