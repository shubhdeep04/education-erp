import express from "express";

const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Super Admin Dashboard API Working",
  });
});

export default router;