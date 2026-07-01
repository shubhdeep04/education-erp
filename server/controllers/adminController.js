import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { getTenantModel } from "../utils/dbManager.js";
import studentSchema from "../models/schemas/studentSchema.js";
import userSchema from "../models/schemas/userSchema.js";
import {
  attendanceSchema,
  gradeSchema,
  assignmentSchema,
} from "../models/schemas/tenantSchemas.js";

/* ── Notice Schema (defined here, only used in admin) ── */
const noticeSchema = new mongoose.Schema(
  {
    title:    { type: String, required: true },
    content:  String,
    type:     { type: String, default: "general" },
    postedBy: String,
  },
  { timestamps: true }
);

// ====================== DASHBOARD STATS ======================
export const getAdminStats = async (req, res) => {
  try {
    const Student    = getTenantModel(req.tenantConn, "Student",    studentSchema);
    const TenantUser = getTenantModel(req.tenantConn, "User",       userSchema);
    const Assignment = getTenantModel(req.tenantConn, "Assignment", assignmentSchema);
    const Attendance = getTenantModel(req.tenantConn, "Attendance", attendanceSchema);

    const totalStudents    = await Student.countDocuments();
    const totalTeachers    = await TenantUser.countDocuments({ role: "teacher" });
    const totalAssignments = await Assignment.countDocuments();
    const attendanceRecords = await Attendance.find();

    const avgAttendance = attendanceRecords.length
      ? Math.round(
          attendanceRecords.reduce((sum, r) => {
            const total = (r.present || 0) + (r.absent || 0) + (r.late || 0);
            return sum + (total ? ((r.present || 0) / total) * 100 : 0);
          }, 0) / attendanceRecords.length
        )
      : 0;

    res.json({ success: true, data: { totalStudents, totalTeachers, totalAssignments, avgAttendance } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====================== STUDENTS ======================
export const getStudents = async (req, res) => {
  try {
    const Student = getTenantModel(req.tenantConn, "Student", studentSchema);
    const students = await Student.find().sort({ createdAt: -1 });
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addStudent = async (req, res) => {
  try {
    const Student = getTenantModel(req.tenantConn, "Student", studentSchema);
    const student = await Student.create(req.body);
    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const Student = getTenantModel(req.tenantConn, "Student", studentSchema);
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const Student = getTenantModel(req.tenantConn, "Student", studentSchema);
    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====================== TEACHERS ======================
export const getTeachers = async (req, res) => {
  try {
    const TenantUser = getTenantModel(req.tenantConn, "User", userSchema);
    const teachers = await TenantUser.find({ role: "teacher" }).sort({ createdAt: -1 });
    res.json({ success: true, data: teachers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addTeacher = async (req, res) => {
  try {
    const TenantUser = getTenantModel(req.tenantConn, "User", userSchema);
    const { name, email, password } = req.body;
    const existing = await TenantUser.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Teacher with this email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password || "123456", 10);
    const teacher = await TenantUser.create({ name, email, password: hashedPassword, role: "teacher" });
    res.json({ success: true, data: { ...teacher.toObject(), password: undefined } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const TenantUser = getTenantModel(req.tenantConn, "User", userSchema);
    const { password, ...rest } = req.body;
    const update = password ? { ...rest, password: await bcrypt.hash(password, 10) } : rest;
    const teacher = await TenantUser.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json({ success: true, data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const TenantUser = getTenantModel(req.tenantConn, "User", userSchema);
    await TenantUser.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Teacher deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====================== GRADES ======================
export const getGrades = async (req, res) => {
  try {
    const Grade = getTenantModel(req.tenantConn, "Grade", gradeSchema);
    const grades = await Grade.find().sort({ createdAt: -1 });
    res.json({ success: true, data: grades });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====================== ATTENDANCE ======================
export const getAttendance = async (req, res) => {
  try {
    const Attendance = getTenantModel(req.tenantConn, "Attendance", attendanceSchema);
    const records = await Attendance.find().sort({ createdAt: -1 });
    res.json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====================== ASSIGNMENTS ======================
export const getAssignments = async (req, res) => {
  try {
    const Assignment = getTenantModel(req.tenantConn, "Assignment", assignmentSchema);
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json({ success: true, data: assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====================== NOTICES ======================
export const getNotices = async (req, res) => {
  try {
    const Notice = getTenantModel(req.tenantConn, "Notice", noticeSchema);
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json({ success: true, data: notices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addNotice = async (req, res) => {
  try {
    const Notice = getTenantModel(req.tenantConn, "Notice", noticeSchema);
    const notice = await Notice.create({ ...req.body, postedBy: req.user?.name || "Admin" });
    res.json({ success: true, data: notice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const Notice = getTenantModel(req.tenantConn, "Notice", noticeSchema);
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Notice deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};