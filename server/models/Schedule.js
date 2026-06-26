import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
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

    day: {
      type: String,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    room: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Schedule", scheduleSchema);