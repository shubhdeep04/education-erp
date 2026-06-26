import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    subject: String,
    qualification: String,
  },
  {
    timestamps: true,
  }
);

const Teacher =
  mongoose.models.Teacher ||
  mongoose.model("Teacher", teacherSchema);

export default Teacher;