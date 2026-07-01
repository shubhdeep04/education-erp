import mongoose from "mongoose";

/* ══════════════════════════════════════════════════════════════
   USER SCHEMA (reusable across tenant databases)
   This is just the Schema definition — NOT bound to any specific
   mongoose connection. Each institute's database registers its
   own User model from this schema via getTenantModel().

   Your existing master-DB User model (models/User.js) can keep
   using this exact same schema shape for consistency, or you can
   import this schema directly into User.js to avoid duplication.
══════════════════════════════════════════════════════════════ */

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      required: true,
    },
  },
  { timestamps: true }
);

export default userSchema;