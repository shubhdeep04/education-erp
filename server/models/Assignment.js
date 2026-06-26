import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
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

    teacher: {
      type: String,
      default: "Teacher",
    },

    dueDate: {
      type: Date,
      required: true,
    },

    totalMarks: {
      type: Number,
      default: 100,
    },

    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Assignment",
  assignmentSchema
);