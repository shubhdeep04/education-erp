




// import Attendance from "../models/Attendance.js";
// import Grade from "../models/Grade.js";
// import Assignment from "../models/Assignment.js";
// import Teacher from "../models/Teacher.js";
// import Schedule from "../models/Schedule.js";

// import studentSchema from "../models/schemas/studentSchema.js";
// import { getTenantModel } from "../utils/dbManager.js";

// /* ══════════════════════════════════════════════════════════════
//    NOTE ON MULTI-TENANCY (read this first)

//    req.tenantConn is attached by the `protect` auth middleware
//    (see middleware/authMiddleware.js) — it's the mongoose
//    Connection for the logged-in user's institute database.

//    For any model that should be PER-INSTITUTE (Student, Teacher,
//    Attendance, Grade, Assignment, Schedule, etc.), don't import a
//    model directly bound to the default connection. Instead, pull
//    it from req.tenantConn using getTenantModel() + that model's
//    reusable schema (see models/schemas/*.js).

//    This file currently only converts the Student functions as the
//    example pattern. Attendance/Grade/Assignment/Schedule/Teacher
//    functions still use the OLD master-DB models temporarily —
//    they'll be converted the same way in the next steps.
// ══════════════════════════════════════════════════════════════ */

// // ====================== DASHBOARD ======================
// export const getTeacherStats = async (req, res) => {
//     try {
//         const Student = getTenantModel(req.tenantConn, "Student", studentSchema);

//         const totalStudents = await Student.countDocuments();
//         const totalAssignments = await Assignment.countDocuments();
//         const pendingAssignments = await Assignment.countDocuments({ status: "active" });

//         res.json({
//             success: true,
//             totalStudents,
//             totalAssignments,
//             pendingAssignments,
//             todayClasses: 4,
//             attendanceRate: 92
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // ====================== PENDING ASSIGNMENTS ======================
// export const getPendingAssignments = async (req, res) => {
//     try {
//         const assignments = await Assignment.find({ status: "active" })
//             .sort({ dueDate: 1 });
//         res.json({ success: true, data: assignments });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // ====================== STUDENTS (now tenant-aware) ======================
// export const getStudents = async (req, res) => {
//   try {
//     const Student = getTenantModel(req.tenantConn, "Student", studentSchema);
//     const students = await Student.find();

//     res.json({
//       success: true,
//       data: students,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const addStudent = async (req, res) => {
//   try {
//     const Student = getTenantModel(req.tenantConn, "Student", studentSchema);

//     const student = await Student.create({
//       name: req.body.name || "Rahul Sharma",
//       rollNo: req.body.rollNo || "101",
//       batch: req.body.batch || "Batch A",
//       course: req.body.course || "Maths",
//       attendance: req.body.attendance ?? 90,
//       grade: req.body.grade || "A",
//       status: req.body.status || "Active",
//     });

//     res.json({
//       success: true,
//       data: student,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const updateStudent = async (req, res) => {
//   try {
//     const Student = getTenantModel(req.tenantConn, "Student", studentSchema);

//     const student = await Student.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json({ success: true, data: student });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const deleteStudent = async (req, res) => {
//   try {
//     const Student = getTenantModel(req.tenantConn, "Student", studentSchema);
//     await Student.findByIdAndDelete(req.params.id);
//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ====================== ATTENDANCE (still old pattern — next step) ======================
// export const markAttendance = async (req, res) => {
//   try {
//     console.log("BODY:", req.body);
//     console.log("MODEL:", Attendance.schema.obj);

//     const attendance = await Attendance.create(req.body);

//     res.json({
//       success: true,
//       data: attendance,
//     });
//   } catch (error) {
//     console.log("Attendance Error:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// export const getAttendance = async (req, res) => {
//     try {
//         const attendance = await Attendance.find();
//         res.json({ success: true, data: attendance });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// export const updateAttendance = async (req, res) => {
//   try {
//     const attendance = await Attendance.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json({
//       success: true,
//       data: attendance,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const deleteAttendance = async (req, res) => {
//   try {
//     await Attendance.findByIdAndDelete(req.params.id);

//     res.json({
//       success: true,
//       message: "Attendance deleted",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Add Grade
// export const addGrade = async (req, res) => {
//   try {
//     const grade = await Grade.create(req.body);

//     res.json({
//       success: true,
//       data: grade,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Get All Grades
// export const getGrades = async (req, res) => {
//   try {
//     const grades = await Grade.find().sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       data: grades,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Update Grade
// export const updateGrade = async (req, res) => {
//   try {
//     const grade = await Grade.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json({
//       success: true,
//       data: grade,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Delete Grade
// export const deleteGrade = async (req, res) => {
//   try {
//     await Grade.findByIdAndDelete(req.params.id);

//     res.json({
//       success: true,
//       message: "Grade deleted",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const addAssignment = async (req, res) => {
//   try {
//     const assignment = await Assignment.create({
//       title: req.body.title,
//       subject: req.body.subject,
//       batch: req.body.batch,
//       dueDate: req.body.dueDate,
//       description: req.body.description,
//       status: "Active",
//     });

//     res.json({
//       success: true,
//       data: assignment,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// export const getAssignments = async (req, res) => {
//   try {
//     const assignments = await Assignment.find().sort({
//       createdAt: -1,
//     });

//     res.json({
//       success: true,
//       data: assignments,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// export const deleteAssignment = async (req, res) => {
//   try {
//     const assignment = await Assignment.findByIdAndDelete(
//       req.params.id
//     );

//     if (!assignment) {
//       return res.status(404).json({
//         success: false,
//         message: "Assignment not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Assignment deleted successfully",
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // GET ALL SCHEDULES
// export const getSchedule = async (req, res) => {
//   try {
//     const schedules = await Schedule.find().sort({
//       createdAt: -1,
//     });

//     res.json({
//       success: true,
//       data: schedules,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ADD SCHEDULE
// export const addSchedule = async (req, res) => {
//   try {
//     console.log("SCHEDULE DATA:", req.body);

//     const schedule = await Schedule.create({
//       day: req.body.day,
//       subject: req.body.subject,
//       batch: req.body.batch,
//       room: req.body.room || "",

//       startTime: req.body.time,
//       endTime: req.body.time,

//       teacher: "Teacher"
//     });

//     res.json({
//       success: true,
//       data: schedule
//     });

//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };
// // UPDATE SCHEDULE
// export const updateSchedule = async (req, res) => {
//   try {
//     const schedule =
//       await Schedule.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         { new: true }
//       );

//     res.json({
//       success: true,
//       data: schedule,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // DELETE SCHEDULE
// export const deleteSchedule = async (req, res) => {
//   try {
//     await Schedule.findByIdAndDelete(
//       req.params.id
//     );

//     res.json({
//       success: true,
//       message: "Schedule deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const getProfile = async (req, res) => {
//     try {
//         let teacher = await Teacher.findOne();

//         if (!teacher) {
//             teacher = await Teacher.create({
//                 name: "Rahul Sharma",
//                 email: "rahul.sharma@school.com",
//                 phone: "9876543210",
//                 subject: "Mathematics",
//                 qualification: "M.Sc, B.Ed",
//                 experience: 8,
//                 address: "Indore, Madhya Pradesh"
//             });
//             console.log("Sample Teacher Created");
//         }

//         res.json({
//             success: true,
//             data: teacher
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
//       };
//          export const updateProfile = async (req, res) => {
//     try {
//         const teacher = await Teacher.findOneAndUpdate({}, req.body, { new: true });
//         res.json({ success: true, data: teacher });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

import { getTenantModel } from "../utils/dbManager.js";
import studentSchema from "../models/schemas/studentSchema.js";
import {
  attendanceSchema,
  gradeSchema,
  assignmentSchema,
  scheduleSchema,
  teacherProfileSchema,
} from "../models/schemas/tenantSchemas.js";

/* ══════════════════════════════════════════════════════════════
   TEACHER CONTROLLER — Fully Multi-tenant
   All models are now resolved from req.tenantConn (the logged-in
   teacher's institute database) instead of the master DB.
══════════════════════════════════════════════════════════════ */

// ====================== DASHBOARD STATS ======================
export const getTeacherStats = async (req, res) => {
  try {
    const Student    = getTenantModel(req.tenantConn, "Student",    studentSchema);
    const Assignment = getTenantModel(req.tenantConn, "Assignment", assignmentSchema);

    const totalStudents      = await Student.countDocuments();
    const totalAssignments   = await Assignment.countDocuments();
    const pendingAssignments = await Assignment.countDocuments({ status: "Active" });

    res.json({
      success: true,
      data: {
        totalStudents,
        totalAssignments,
        pendingReviews: pendingAssignments,
        todayClasses: 4,
        attendanceRate: 92,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====================== PENDING ASSIGNMENTS ======================
export const getPendingAssignments = async (req, res) => {
  try {
    const Assignment = getTenantModel(req.tenantConn, "Assignment", assignmentSchema);
    const assignments = await Assignment.find({ status: "Active" }).sort({ dueDate: 1 });
    res.json({ success: true, data: assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====================== STUDENTS ======================
export const getStudents = async (req, res) => {
  try {
    const Student = getTenantModel(req.tenantConn, "Student", studentSchema);
    const students = await Student.find();
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addStudent = async (req, res) => {
  try {
    const Student = getTenantModel(req.tenantConn, "Student", studentSchema);
    const student = await Student.create({
      name:       req.body.name       || "New Student",
      rollNo:     req.body.rollNo     || "",
      batch:      req.body.batch      || "",
      course:     req.body.course     || "",
      attendance: req.body.attendance ?? 0,
      grade:      req.body.grade      || "",
      status:     req.body.status     || "Active",
    });
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
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====================== ATTENDANCE ======================
export const markAttendance = async (req, res) => {
  try {
    const Attendance = getTenantModel(req.tenantConn, "Attendance", attendanceSchema);
    const { date, subject, batch, students: studentList = [] } = req.body;

    const present = studentList.filter(s => s.status === "Present").length;
    const absent  = studentList.filter(s => s.status === "Absent").length;
    const late    = studentList.filter(s => s.status === "Late").length;

    const attendance = await Attendance.create({
      date, subject, batch, students: studentList, present, absent, late,
    });
    res.json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const Attendance = getTenantModel(req.tenantConn, "Attendance", attendanceSchema);
    const records = await Attendance.find().sort({ createdAt: -1 });
    res.json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAttendance = async (req, res) => {
  try {
    const Attendance = getTenantModel(req.tenantConn, "Attendance", attendanceSchema);
    const record = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAttendance = async (req, res) => {
  try {
    const Attendance = getTenantModel(req.tenantConn, "Attendance", attendanceSchema);
    await Attendance.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Attendance deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====================== GRADES ======================
export const addGrade = async (req, res) => {
  try {
    const Grade = getTenantModel(req.tenantConn, "Grade", gradeSchema);
    const grade = await Grade.create(req.body);
    res.json({ success: true, data: grade });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGrades = async (req, res) => {
  try {
    const Grade = getTenantModel(req.tenantConn, "Grade", gradeSchema);
    const grades = await Grade.find().sort({ createdAt: -1 });
    res.json({ success: true, data: grades });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateGrade = async (req, res) => {
  try {
    const Grade = getTenantModel(req.tenantConn, "Grade", gradeSchema);
    const grade = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: grade });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteGrade = async (req, res) => {
  try {
    const Grade = getTenantModel(req.tenantConn, "Grade", gradeSchema);
    await Grade.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Grade deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====================== ASSIGNMENTS ======================
export const addAssignment = async (req, res) => {
  try {
    const Assignment = getTenantModel(req.tenantConn, "Assignment", assignmentSchema);
    const assignment = await Assignment.create({
      title:       req.body.title,
      subject:     req.body.subject,
      batch:       req.body.batch,
      dueDate:     req.body.dueDate,
      description: req.body.description,
      status:      "Active",
    });
    res.json({ success: true, data: assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const Assignment = getTenantModel(req.tenantConn, "Assignment", assignmentSchema);
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json({ success: true, data: assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAssignment = async (req, res) => {
  try {
    const Assignment = getTenantModel(req.tenantConn, "Assignment", assignmentSchema);
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    const Assignment = getTenantModel(req.tenantConn, "Assignment", assignmentSchema);
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) {
      return res.status(404).json({ success: false, message: "Assignment not found" });
    }
    res.json({ success: true, message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====================== SCHEDULE ======================
export const getSchedule = async (req, res) => {
  try {
    const Schedule = getTenantModel(req.tenantConn, "Schedule", scheduleSchema);
    const schedules = await Schedule.find().sort({ createdAt: -1 });
    res.json({ success: true, data: schedules });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addSchedule = async (req, res) => {
  try {
    const Schedule = getTenantModel(req.tenantConn, "Schedule", scheduleSchema);
    const schedule = await Schedule.create({
      day:       req.body.day,
      subject:   req.body.subject,
      batch:     req.body.batch,
      room:      req.body.room || "",
      startTime: req.body.time,
      endTime:   req.body.time,
      teacher:   req.user?.name || "Teacher",
    });
    res.json({ success: true, data: schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const Schedule = getTenantModel(req.tenantConn, "Schedule", scheduleSchema);
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const Schedule = getTenantModel(req.tenantConn, "Schedule", scheduleSchema);
    await Schedule.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====================== TEACHER PROFILE ======================
export const getProfile = async (req, res) => {
  try {
    const TeacherProfile = getTenantModel(req.tenantConn, "TeacherProfile", teacherProfileSchema);
    let teacher = await TeacherProfile.findOne({ email: req.user?.email });

    if (!teacher) {
      teacher = await TeacherProfile.create({
        name:  req.user?.name  || "Teacher",
        email: req.user?.email || "",
        status: "Active",
      });
    }

    res.json({ success: true, data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const TeacherProfile = getTenantModel(req.tenantConn, "TeacherProfile", teacherProfileSchema);
    const teacher = await TeacherProfile.findOneAndUpdate(
      { email: req.user?.email },
      req.body,
      { new: true, upsert: true }
    );
    res.json({ success: true, data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};