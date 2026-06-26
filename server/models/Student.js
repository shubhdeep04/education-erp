import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
  },

  rollNo: {
    type: String,
    required: true,
  },

  email: String,

  phone: String,

  course: String,

  batch: String,

  attendance: {
    type: Number,
    default: 0,
  },

  grade: {
    type: String,
    default: "-",
  },

  status: {
    type: String,
    default: "Active",
  },
},
{
  timestamps: true,
}
);

export default mongoose.model("Student", studentSchema);