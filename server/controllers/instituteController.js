import Institute from "../models/Institute.js";
import { getInstituteConnection, getTenantModel } from "../utils/dbManager.js";
import userSchema from "../models/schemas/userSchema.js";
import bcrypt from "bcryptjs";

/* ══════════════════════════════════════════════════════════════
   SUPER ADMIN — INSTITUTE MANAGEMENT CONTROLLER
   These routes live on the MASTER database (default mongoose
   connection) and manage the registry of all institutes.
══════════════════════════════════════════════════════════════ */

// Helper: turn "Bright Futures Academy" into "bright-futures-academy"
const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// ====================== GET ALL INSTITUTES ======================
export const getInstitutes = async (req, res) => {
  try {
    const institutes = await Institute.find().sort({ createdAt: -1 });
    res.json({ success: true, data: institutes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====================== ONBOARD NEW INSTITUTE ======================
export const onboardInstitute = async (req, res) => {
  try {
    const {
      name,
      contactEmail,
      contactPhone,
      address,
      plan,
      adminName,
      adminEmail,
      adminPassword,
    } = req.body;

    if (!name || !adminEmail || !adminPassword) {
      return res.status(400).json({
        success: false,
        message: "Institute name, admin email and admin password are required.",
      });
    }

    const code = slugify(name);
    const dbName = `edu_${code.replace(/-/g, "_")}`;

    const existing = await Institute.findOne({ $or: [{ code }, { dbName }] });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "An institute with a similar name already exists. Please choose a different name.",
      });
    }

    // 1. Create the institute record in the MASTER database
    const institute = await Institute.create({
      name,
      code,
      dbName,
      contactEmail,
      contactPhone,
      address,
      plan: plan || "trial",
      status: "active",
    });

    // 2. Connect to the new institute's isolated database
    const tenantConn = getInstituteConnection(dbName);
    const TenantUser = getTenantModel(tenantConn, "User", userSchema);

    // 3. Create the first Institute Admin user inside that isolated DB
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await TenantUser.create({
      name: adminName || "Institute Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({
      success: true,
      message: `Institute "${name}" onboarded successfully.`,
      data: institute,
      loginInfo: {
        instituteCode: code,
        adminEmail,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====================== UPDATE INSTITUTE ======================
export const updateInstitute = async (req, res) => {
  try {
    const { name, contactEmail, contactPhone, address, plan, status } = req.body;
    const institute = await Institute.findByIdAndUpdate(
      req.params.id,
      { name, contactEmail, contactPhone, address, plan, status },
      { new: true }
    );
    if (!institute) {
      return res.status(404).json({ success: false, message: "Institute not found." });
    }
    res.json({ success: true, data: institute });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====================== SUSPEND / ACTIVATE INSTITUTE ======================
export const toggleInstituteStatus = async (req, res) => {
  try {
    const institute = await Institute.findById(req.params.id);
    if (!institute) {
      return res.status(404).json({ success: false, message: "Institute not found." });
    }
    institute.status = institute.status === "active" ? "suspended" : "active";
    await institute.save();
    res.json({ success: true, data: institute });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====================== DELETE INSTITUTE (registry only) ======================
// Note: this only removes the institute from the master registry.
// It does NOT drop the isolated database, as a safety measure
// against accidental data loss. Drop the DB manually if truly needed.
export const deleteInstitute = async (req, res) => {
  try {
    const institute = await Institute.findByIdAndDelete(req.params.id);
    if (!institute) {
      return res.status(404).json({ success: false, message: "Institute not found." });
    }
    res.json({
      success: true,
      message: `Institute "${institute.name}" removed from registry. Its database (${institute.dbName}) was NOT deleted.`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};