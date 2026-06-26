import express from "express";

const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.json({
    success: true,
    data: {
      totalStudents: 500,
      totalTeachers: 25,
      totalCourses: 15,
      totalRevenue: 2500000,
    },
  });
});

router.get("/students", (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        name: "Rahul",
        course: "Science",
      },
    ],
  });
});

router.get("/teachers", (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        name: "Mr. Sharma",
        subject: "Maths",
      },
    ],
  });
});

router.get("/courses", (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        name: "Mathematics",
      },
    ],
  });
});

export default router;