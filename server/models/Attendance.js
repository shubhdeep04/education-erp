import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    batch: {
      type: String,
      required: true,
    },

    students: [
      {
        studentId: String,
        studentName: String,
        status: {
          type: String,
          enum: ["Present", "Absent", "Late"],
          default: "Present",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;