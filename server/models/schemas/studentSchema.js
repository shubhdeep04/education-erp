import mongoose from "mongoose";

/* ══════════════════════════════════════════════════════════════
   STUDENT SCHEMA (reusable across tenant databases)
   Just the Schema definition — not bound to any connection.
   Each institute's database registers its own Student model
   from this schema via getTenantModel().
══════════════════════════════════════════════════════════════ */

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rollNo: String,
    batch: String,
    course: String,
    attendance: { type: Number, default: 0 },
    grade: String,
    status: { type: String, default: "Active" },
  },
  { timestamps: true }
);

export default studentSchema;