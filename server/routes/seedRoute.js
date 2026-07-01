// import express from "express";
// import bcrypt from "bcryptjs";
// import User from "../models/User.js";

// const router = express.Router();

// /* ══════════════════════════════════════════════════════════════
//    TEMPORARY SEED ROUTE
//    Visit this URL once in your browser (or Postman) to auto-create
//    / fix demo users with correctly hashed passwords:

//    GET http://localhost:5000/api/seed/demo-users

//    ⚠️ IMPORTANT: Remove this route file and its import in server.js
//    once you're done — never keep a seed route live in production.
// ══════════════════════════════════════════════════════════════ */

// router.get("/demo-users", async (req, res) => {
//   try {
//     const demoUsers = [
//       { name: "Admin",     email: "admin1@gmail.com",   role: "admin"      },
//       { name: "Teacher",   email: "teacher43@gmail.com",role: "teacher"    },
//       { name: "Student",   email: "student12@gmail.com",role: "student"    },
//       { name: "SuperAdmin",email: "superadmin@gmail.com",role: "superadmin"},
//     ];

//     const hashedPassword = await bcrypt.hash("123456", 10);
//     const results = [];

//     for (const u of demoUsers) {
//       const existing = await User.findOne({ email: u.email });

//       if (existing) {
//         // Fix password on existing (possibly broken) document
//         existing.password = hashedPassword;
//         existing.role = u.role;
//         existing.name = u.name;
//         await existing.save();
//         results.push({ email: u.email, status: "updated" });
//       } else {
//         await User.create({
//           name: u.name,
//           email: u.email,
//           password: hashedPassword,
//           role: u.role,
//         });
//         results.push({ email: u.email, status: "created" });
//       }
//     }

//     res.json({
//       success: true,
//       message: "Demo users seeded successfully. Password for all: 123456",
//       results,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// export default router;



import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Institute from "../models/Institute.js";
import { getInstituteConnection, getTenantModel } from "../utils/dbManager.js";
import userSchema from "../models/schemas/userSchema.js";

const router = express.Router();

/* ══════════════════════════════════════════════════════════════
   TEMPORARY SEED ROUTE
   Visit this URL once in your browser (or Postman) to auto-create
   / fix demo users with correctly hashed passwords:

   GET http://localhost:5000/api/seed/demo-users

   ⚠️ IMPORTANT: Remove this route file and its import in server.js
   once you're done — never keep a seed route live in production.
══════════════════════════════════════════════════════════════ */

router.get("/demo-users", async (req, res) => {
  try {
    const demoUsers = [
      { name: "Admin",     email: "admin1@gmail.com",   role: "admin"      },
      { name: "Teacher",   email: "teacher43@gmail.com",role: "teacher"    },
      { name: "Student",   email: "student12@gmail.com",role: "student"    },
      { name: "SuperAdmin",email: "superadmin@gmail.com",role: "superadmin"},
    ];

    const hashedPassword = await bcrypt.hash("123456", 10);
    const results = [];

    for (const u of demoUsers) {
      const existing = await User.findOne({ email: u.email });

      if (existing) {
        // Fix password on existing (possibly broken) document
        existing.password = hashedPassword;
        existing.role = u.role;
        existing.name = u.name;
        await existing.save();
        results.push({ email: u.email, status: "updated" });
      } else {
        await User.create({
          name: u.name,
          email: u.email,
          password: hashedPassword,
          role: u.role,
        });
        results.push({ email: u.email, status: "created" });
      }
    }

    res.json({
      success: true,
      message: "Demo users seeded successfully. Password for all: 123456",
      results,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ══════════════════════════════════════════════════════════════
   DEMO INSTITUTE SEED ROUTE
   Creates a fixed institute with code "demo" — always available
   for testing the multi-tenant login flow without needing to
   manually onboard via the UI each time.

   Visit: GET http://localhost:5000/api/seed/demo-institute

   Login afterwards with:
     Institute Code: demo
     Admin:   demo.admin@edusphere.in   / 123456
     Teacher: demo.teacher@edusphere.in / 123456
     Student: demo.student@edusphere.in / 123456
══════════════════════════════════════════════════════════════ */

router.get("/demo-institute", async (req, res) => {
  try {
    const dbName = "edu_demo";
    const hashedPassword = await bcrypt.hash("123456", 10);

    // 1. Create or fetch the demo institute in the master registry
    let institute = await Institute.findOne({ code: "demo" });
    if (!institute) {
      institute = await Institute.create({
        name: "Demo Institute",
        code: "demo",
        dbName,
        contactEmail: "demo@edusphere.in",
        plan: "trial",
        status: "active",
      });
    } else if (institute.status !== "active") {
      institute.status = "active";
      await institute.save();
    }

    // 2. Connect to the demo institute's own isolated database
    const tenantConn = getInstituteConnection(dbName);
    const TenantUser = getTenantModel(tenantConn, "User", userSchema);

    const demoUsers = [
      { name: "Demo Admin",   email: "demo.admin@edusphere.in",   role: "admin"   },
      { name: "Demo Teacher", email: "demo.teacher@edusphere.in", role: "teacher" },
      { name: "Demo Student", email: "demo.student@edusphere.in", role: "student" },
    ];

    const results = [];
    for (const u of demoUsers) {
      const existing = await TenantUser.findOne({ email: u.email });
      if (existing) {
        existing.password = hashedPassword;
        existing.role = u.role;
        existing.name = u.name;
        await existing.save();
        results.push({ email: u.email, status: "updated" });
      } else {
        await TenantUser.create({
          name: u.name,
          email: u.email,
          password: hashedPassword,
          role: u.role,
        });
        results.push({ email: u.email, status: "created" });
      }
    }

    res.json({
      success: true,
      message: 'Demo institute ready. Use Institute Code "demo" to log in. Password for all: 123456',
      instituteCode: "demo",
      results,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});



router.get("/activate-demo", async (req, res) => {
  try {
    const institute = await Institute.findOne({ code: "demo" });
    if (!institute) {
      return res.json({ success: false, message: "Demo institute not found. Run /api/seed/demo-institute first." });
    }
    institute.status = "active";
    await institute.save();
    res.json({ success: true, message: "Demo institute activated!", status: institute.status });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});







export default router;