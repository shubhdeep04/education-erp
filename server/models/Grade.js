import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema(
  {
    student: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    exam: {
      type: String,
      required: true,
    },

    marks: {
      type: Number,
      required: true,
    },

    maxMarks: {
      type: Number,
      default: 100,
    },

    grade: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Grade", gradeSchema);