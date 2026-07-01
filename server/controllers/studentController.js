// const Student =
//   require("../models/Student")



// /* =========================
//    ADD STUDENT
// ========================= */

// exports.addStudent =
//   async (req, res) => {

//     try {

//       const student =
//         new Student(req.body)

//       await student.save()

//       res.status(201).json({

//         success: true,

//         message:
//           "Student Added Successfully",

//         student

//       })

//     }

//     catch (error) {

//       res.status(500).json({

//         success: false,

//         message:
//           "Server Error",

//         error: error.message

//       })

//     }

// }



// /* =========================
//    GET ALL STUDENTS
// ========================= */

// exports.getStudents =
//   async (req, res) => {

//     try {

//       const students =
//         await Student.find()

//       res.status(200).json({

//         success: true,

//         students

//       })

//     }

//     catch (error) {

//       res.status(500).json({

//         success: false,

//         message:
//           "Server Error"

//       })

//     }

// }



// /* =========================
//    DELETE STUDENT
// ========================= */

// exports.deleteStudent =
//   async (req, res) => {

//     try {

//       await Student.findByIdAndDelete(
//         req.params.id
//       )

//       res.status(200).json({

//         success: true,

//         message:
//           "Student Deleted"

//       })

//     }

//     catch (error) {

//       res.status(500).json({

//         success: false,

//         message:
//           "Server Error"

//       })

//     }

// }

// /* =========================
//    UPDATE STUDENT
// ========================= */

// exports.updateStudent =
//   async (req, res) => {

//     try {

//       const updatedStudent =
//         await Student.findByIdAndUpdate(

//           req.params.id,

//           req.body,

//           { new: true }

//         )

//       res.status(200).json({

//         success: true,

//         message:
//           "Student Updated",

//         updatedStudent

//       })

//     }

//     catch (error) {

//       res.status(500).json({

//         success: false,

//         message:
//           "Server Error"

//       })

//     }

// }


import mongoose from "mongoose";
import { getTenantModel } from "../utils/dbManager.js";
import studentSchema from "../models/schemas/studentSchema.js";
import {
  attendanceSchema,
  gradeSchema,
  assignmentSchema,
  scheduleSchema,
} from "../models/schemas/tenantSchemas.js";

/* ── Notice Schema ── */
const noticeSchema = new mongoose.Schema(
  { title:{type:String,required:true}, content:String, type:{type:String,default:"general"}, postedBy:String },
  { timestamps:true }
);

/* ── Fee Schema ── */
const feeSchema = new mongoose.Schema(
  { studentName:String, amount:Number, paid:Number, status:{type:String,default:"Pending"}, dueDate:String, description:String },
  { timestamps:true }
);

/* ── Course Schema ── */
const courseSchema = new mongoose.Schema(
  { name:{type:String,required:true}, subject:String, teacher:String, batch:String, duration:String, status:{type:String,default:"Active"} },
  { timestamps:true }
);

// ====================== DASHBOARD STATS ======================
export const getStudentStats = async (req, res) => {
  try {
    const Grade      = getTenantModel(req.tenantConn, "Grade",      gradeSchema);
    const Attendance = getTenantModel(req.tenantConn, "Attendance", attendanceSchema);
    const Assignment = getTenantModel(req.tenantConn, "Assignment", assignmentSchema);

    const totalAssignments  = await Assignment.countDocuments();
    const grades            = await Grade.find();
    const avgMarks = grades.length
      ? Math.round(grades.reduce((s,g) => s+(g.marks||0), 0) / grades.length) : 0;

    const attendanceRecords = await Attendance.find();
    const totalPresent = attendanceRecords.reduce((s,r) => s+(r.present||0), 0);
    const totalCount   = attendanceRecords.reduce((s,r) => s+(r.present||0)+(r.absent||0)+(r.late||0), 0);
    const attendancePct = totalCount ? Math.round((totalPresent/totalCount)*100) : 0;

    res.json({ success:true, data:{ totalAssignments, avgMarks, attendancePct, totalGrades:grades.length } });
  } catch (error) {
    res.status(500).json({ success:false, message:error.message });
  }
};

// ====================== PROFILE ======================
export const getStudentProfile = async (req, res) => {
  try {
    const Student = getTenantModel(req.tenantConn, "Student", studentSchema);
    const student = await Student.findOne({ email: req.user?.email });
    res.json({ success:true, data: student || {} });
  } catch (error) {
    res.status(500).json({ success:false, message:error.message });
  }
};

// ====================== GRADES ======================
export const getStudentGrades = async (req, res) => {
  try {
    const Grade = getTenantModel(req.tenantConn, "Grade", gradeSchema);
    const grades = await Grade.find().sort({ createdAt:-1 });
    res.json({ success:true, data:grades });
  } catch (error) {
    res.status(500).json({ success:false, message:error.message });
  }
};

// ====================== ATTENDANCE ======================
export const getStudentAttendance = async (req, res) => {
  try {
    const Attendance = getTenantModel(req.tenantConn, "Attendance", attendanceSchema);
    const records = await Attendance.find().sort({ createdAt:-1 });
    res.json({ success:true, data:records });
  } catch (error) {
    res.status(500).json({ success:false, message:error.message });
  }
};

// ====================== ASSIGNMENTS ======================
export const getStudentAssignments = async (req, res) => {
  try {
    const Assignment = getTenantModel(req.tenantConn, "Assignment", assignmentSchema);
    const assignments = await Assignment.find().sort({ dueDate:1 });
    res.json({ success:true, data:assignments });
  } catch (error) {
    res.status(500).json({ success:false, message:error.message });
  }
};

// ====================== SCHEDULE ======================
export const getStudentSchedule = async (req, res) => {
  try {
    const Schedule = getTenantModel(req.tenantConn, "Schedule", scheduleSchema);
    const schedule = await Schedule.find().sort({ createdAt:-1 });
    res.json({ success:true, data:schedule });
  } catch (error) {
    res.status(500).json({ success:false, message:error.message });
  }
};

// ====================== NOTICES ======================
export const getStudentNotices = async (req, res) => {
  try {
    const Notice = getTenantModel(req.tenantConn, "Notice", noticeSchema);
    const notices = await Notice.find().sort({ createdAt:-1 });
    res.json({ success:true, data:notices });
  } catch (error) {
    res.status(500).json({ success:false, message:error.message });
  }
};

// ====================== FEES ======================
export const getStudentFees = async (req, res) => {
  try {
    const Fee = getTenantModel(req.tenantConn, "Fee", feeSchema);
    const fees = await Fee.find().sort({ createdAt:-1 });
    res.json({ success:true, data:fees });
  } catch (error) {
    res.status(500).json({ success:false, message:error.message });
  }
};

// ====================== COURSES ======================
export const getStudentCourses = async (req, res) => {
  try {
    const Course = getTenantModel(req.tenantConn, "Course", courseSchema);
    const courses = await Course.find().sort({ createdAt:-1 });
    res.json({ success:true, data:courses });
  } catch (error) {
    res.status(500).json({ success:false, message:error.message });
  }
};