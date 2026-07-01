import mongoose from "mongoose";

/* ══════════════════════════════════════════════════════════════
   INSTITUTE MODEL (lives in the MASTER database)
   This is the central registry of every institute using the
   platform. Each institute gets its own isolated database,
   identified by `dbName`.
══════════════════════════════════════════════════════════════ */

const instituteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // Unique code used for login identification (e.g. "bright-future")
    code: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // The actual MongoDB database name for this institute's isolated data
    dbName: {
      type: String,
      required: true,
      unique: true,
    },
    contactEmail: String,
    contactPhone: String,
    address: String,

    plan: {
      type: String,
      enum: ["trial", "basic", "pro", "enterprise"],
      default: "trial",
    },
    status: {
      type: String,
      enum: ["active", "suspended", "inactive"],
      default: "active",
    },

    onboardedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Institute =
  mongoose.models.Institute || mongoose.model("Institute", instituteSchema);

export default Institute;