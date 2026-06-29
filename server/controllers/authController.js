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
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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

export const loginUser = async (req, res) => {
  try {
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
        role: user.role
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