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