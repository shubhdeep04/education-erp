// import User from "../models/User.js"
// import bcrypt from "bcryptjs"
// import jwt from "jsonwebtoken"

// export const registerUser = async (req, res) => {

//   try {

//     const {
//       name,
//       email,
//       password,
//       role
//     } = req.body

//     const existingUser =
//       await User.findOne({ email })

//     if (existingUser) {

//       return res.status(400).json({
//         success: false,
//         message: "User already exists"
//       })

//     }

//     const hashedPassword =
//       await bcrypt.hash(password, 10)

//     const user = await User.create({

//       name,
//       email,
//       password: hashedPassword,
//       role

//     })

//     res.status(201).json({
//       success: true,
//       message: "User Registered Successfully",
//       user
//     })

//   } catch (error) {

//     console.log(error)

//     res.status(500).json({
//       success: false,
//       message: "Server Error"
//     })

//   }

// }

// export const loginUser = async (req, res) => {

//   try {

//     const { email, password } = req.body

//     const user =
//       await User.findOne({ email })

//     if (!user) {

//       return res.status(404).json({
//         success: false,
//         message: "User not found"
//       })

//     }

//     const isMatch =
//       await bcrypt.compare(
//         password,
//         user.password
//       )

//     if (!isMatch) {

//       return res.status(400).json({
//         success: false,
//         message: "Invalid Password"
//       })

//     }

//     const token = jwt.sign(

//       {
//         id: user._id,
//         role: user.role
//       },

//       process.env.JWT_SECRET,

//       {
//         expiresIn: "7d"
//       }

//     )

//     res.status(200).json({

//       success: true,

//       token,

//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }

//     })

//   } catch (error) {

//     console.log(error)

//     res.status(500).json({
//       success: false,
//       message: "Server Error"
//     })

//   }

// }


import User from "../models/User.js"
import Institute from "../models/Institute.js"
import { getInstituteConnection, getTenantModel } from "../utils/dbManager.js"
import userSchema from "../models/schemas/userSchema.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

/* ══════════════════════════════════════════════════════════════
   REGISTER — unchanged, still creates users in the MASTER DB.
   (Use this only for super-admin / platform-level accounts.
   Institute-specific users are created via the onboarding flow
   or institute-admin "Add Teacher/Student" features, which write
   directly to that institute's own database.)
══════════════════════════════════════════════════════════════ */
export const registerUser = async (req, res) => {
const cookieOptions = {
  httpOnly: true,  // JS access nahi kar sakta — XSS safe
  secure: process.env.NODE_ENV === "production",  // HTTPS only prod mein
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000  // 7 din
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashedPassword, role })

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Server Error" })
  }
}

/* ══════════════════════════════════════════════════════════════
   LOGIN — now multi-tenant aware.

   Flow:
   1. If NO instituteCode is provided -> only check the MASTER DB.
      This covers superadmin and any platform-level accounts.
   2. If an instituteCode IS provided -> look it up in the
      Institute registry (master DB), then connect to that
      institute's own isolated database and check its User
      collection there.
══════════════════════════════════════════════════════════════ */
export const loginUser = async (req, res) => {
  try {

    const { email, password, instituteCode } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required."
      })
    }

    let user = null
    let resolvedInstitute = null

    if (!instituteCode) {
      // ── Master DB login (e.g. Super Admin) ──
      user = await User.findOne({ email })

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        })
      }
    } else {
      // ── Institute-scoped login ──
      const institute = await Institute.findOne({ code: instituteCode.toLowerCase().trim() })

      if (!institute) {
        return res.status(404).json({
          success: false,
          message: "Institute not found. Please check your institute code."
        })
      }

      if (institute.status !== "active") {
        return res.status(403).json({
          success: false,
          message: `This institute's account is currently ${institute.status}. Please contact support.`
        })
      }

      const tenantConn = getInstituteConnection(institute.dbName)
      const TenantUser = getTenantModel(tenantConn, "User", userSchema)

      user = await TenantUser.findOne({ email })

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found in this institute."
        })
      }

      resolvedInstitute = institute
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid Password" })
    }

    const token = jwt.sign(

      {
        id: user._id,
        role: user.role,
        instituteCode: resolvedInstitute ? resolvedInstitute.code : null,
        dbName: resolvedInstitute ? resolvedInstitute.dbName : null,
      },

      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    // ✅ Cookie mein bhejo — localStorage nahi
    res.cookie("token", token, cookieOptions)

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        instituteCode: resolvedInstitute ? resolvedInstitute.code : null,
        instituteName: resolvedInstitute ? resolvedInstitute.name : null,
      }
      // ❌ token response mein nahi bheja
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Server Error" })
  }
}

// ✅ naya — navbar ke liye
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }
    res.status(200).json({ success: true, user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Server Error" })
  }
}

// ✅ naya — logout
export const logoutUser = (req, res) => {
  res.clearCookie("token", cookieOptions)
  res.status(200).json({ success: true, message: "Logged out successfully" })
}