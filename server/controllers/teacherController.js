
// 
import Student from "../models/Student.js";
import Attendance from "../models/Attendance.js";
import Grade from "../models/Grade.js";
import Assignment from "../models/Assignment.js";
import Teacher from "../models/Teacher.js";
import Schedule from "../models/Schedule.js";

// ====================== DASHBOARD ======================
export const getTeacherStats = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const totalAssignments = await Assignment.countDocuments();
        const pendingAssignments = await Assignment.countDocuments({ status: "active" });

        res.json({
            success: true,
            totalStudents,
            totalAssignments,
            pendingAssignments,
            todayClasses: 4,
            attendanceRate: 92
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ====================== PENDING ASSIGNMENTS ======================
export const getPendingAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ status: "active" })
            .sort({ dueDate: 1 });
        res.json({ success: true, data: assignments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ====================== ALL OTHER FUNCTIONS ======================
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.json({
      success: true,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const addStudent = async (req, res) => {
  try {
    const student = await Student.create({
      name: "Rahul Sharma",
      rollNo: "101",
      batch: "Batch A",
      course: "Maths",
      attendance: 90,
      grade: "A",
      status: "Active",
    });

    res.json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};












export const markAttendance = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("MODEL:", Attendance.schema.obj);

    const attendance = await Attendance.create(req.body);

    res.json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    console.log("Attendance Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find();
        res.json({ success: true, data: attendance });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Attendance deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const saveAttendance = async () => {
  try {
    const res = await fetch(
      "http://localhost:5000/api/teacher/attendance",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Attendance marked successfully");
      loadAttendance();
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.log(err);
    alert("Server Error");
  }
};


const loadAttendance = async () => {
  try {
    const res = await fetch(
      "http://localhost:5000/api/teacher/attendance"
    );

    const data = await res.json();

    if (data.success) {
      setAttendance(data.data);
    }
  } catch (err) {
    console.log(err);
  }
};











// Add Grade
export const addGrade = async (req, res) => {
  try {
    const grade = await Grade.create(req.body);

    res.json({
      success: true,
      data: grade,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Grades
export const getGrades = async (req, res) => {
  try {
    const grades = await Grade.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: grades,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Grade
export const updateGrade = async (req, res) => {
  try {
    const grade = await Grade.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: grade,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Grade
export const deleteGrade = async (req, res) => {
  try {
    await Grade.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Grade deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 
export const addAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create({
      title: req.body.title,
      subject: req.body.subject,
      batch: req.body.batch,
      dueDate: req.body.dueDate,
      description: req.body.description,
      status: "Active",
    });

    res.json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: assignments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(
      req.params.id
    );

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    res.json({
      success: true,
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL SCHEDULES
export const getSchedule = async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: schedules,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADD SCHEDULE
export const addSchedule = async (req, res) => {
  try {
    console.log("SCHEDULE DATA:", req.body);

    const schedule = await Schedule.create({
      day: req.body.day,
      subject: req.body.subject,
      batch: req.body.batch,
      room: req.body.room || "",

      startTime: req.body.time,
      endTime: req.body.time,

      teacher: "Teacher"
    });

    res.json({
      success: true,
      data: schedule
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
// UPDATE SCHEDULE
export const updateSchedule = async (req, res) => {
  try {
    const schedule =
      await Schedule.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json({
      success: true,
      data: schedule,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE SCHEDULE
export const deleteSchedule = async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Schedule deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
    try {
        let teacher = await Teacher.findOne();

        // Agar koi teacher nahi mila to sample data create kar do (temporary fix)
        if (!teacher) {
            teacher = await Teacher.create({
                name: "Rahul Sharma",
                email: "rahul.sharma@school.com",
                phone: "9876543210",
                subject: "Mathematics",
                qualification: "M.Sc, B.Ed",
                experience: 8,
                address: "Indore, Madhya Pradesh"
            });
            console.log("Sample Teacher Created");
        }

        res.json({
            success: true,
            data: teacher
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
      };
         export const updateProfile = async (req, res) => {
    try {
        const teacher = await Teacher.findOneAndUpdate({}, req.body, { new: true });
        res.json({ success: true, data: teacher });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
