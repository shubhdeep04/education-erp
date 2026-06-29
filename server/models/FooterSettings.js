import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url:   { type: String, required: true },
  order: { type: Number, default: 0 }
});

const footerSettingsSchema = new mongoose.Schema({
  quickLinks:   { type: [linkSchema], default: [] },
  programs:     { type: [linkSchema], default: [] },
  contactItems: { type: [linkSchema], default: [] },
  updatedAt:    { type: Date, default: Date.now }
});

export default mongoose.model("FooterSettings", footerSettingsSchema);