// import express from "express"

// import {
//   registerUser,
//   loginUser
// } from "../controllers/authController.js"

// const router = express.Router()

// // REGISTER

// router.post("/register", registerUser)

// // LOGIN

// router.post("/login", loginUser)

// export default router

import express from "express"
import {
  registerUser,
  loginUser,
  getMe,      // ✅ new
  logoutUser  // ✅ new
} from "../controllers/authController.js"
import { protect } from "../middleware/authMiddleware.js" // ✅ new

const router = express.Router()

router.post("/register", registerUser)
router.post("/login",    loginUser)
router.post("/logout",   logoutUser)          // ✅ new
router.get("/me",        protect, getMe)      // ✅ new — protected

export default router