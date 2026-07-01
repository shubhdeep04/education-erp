import jwt from "jsonwebtoken";
import Institute from "../models/Institute.js";
import { getInstituteConnection } from "../utils/dbManager.js";

/* ══════════════════════════════════════════════════════════════
   AUTH MIDDLEWARE — Multi-tenant aware

   Verifies the JWT token and attaches:
     req.user       -> { id, role, instituteCode, dbName }
     req.tenantConn -> the mongoose Connection for that institute's
                        isolated database (or null for superadmin /
                        master-DB-only accounts)

   Usage in routes:
     router.get("/students", protect, getStudents);

   Inside controllers, instead of importing the Student model
   directly, get it from the request:
     const Student = getTenantModel(req.tenantConn, "Student", studentSchema);
══════════════════════════════════════════════════════════════ */

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    req.user = decoded; // { id, role, instituteCode, dbName }

    if (decoded.dbName) {
      // Institute-scoped user (admin/teacher/student) — attach their tenant DB connection
      req.tenantConn = getInstituteConnection(decoded.dbName);
    } else {
      // Super admin / master-DB-only account — no tenant connection needed
      req.tenantConn = null;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Auth error." });
  }
};

/* ══════════════════════════════════════════════════════════════
   Optional: restrict a route to specific roles
   Usage: router.post("/students", protect, requireRole("admin"), addStudent)
══════════════════════════════════════════════════════════════ */
export const requireRole = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: "You do not have permission to perform this action.",
    });
  }
  next();
};
import jwt from "jsonwebtoken"

export const protect = (req, res, next) => {
  // cookie se token lo
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, please login"
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded  // { id, role }
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    })
  }
}
