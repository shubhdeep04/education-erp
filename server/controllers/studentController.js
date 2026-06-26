const Student =
  require("../models/Student")



/* =========================
   ADD STUDENT
========================= */

exports.addStudent =
  async (req, res) => {

    try {

      const student =
        new Student(req.body)

      await student.save()

      res.status(201).json({

        success: true,

        message:
          "Student Added Successfully",

        student

      })

    }

    catch (error) {

      res.status(500).json({

        success: false,

        message:
          "Server Error",

        error: error.message

      })

    }

}



/* =========================
   GET ALL STUDENTS
========================= */

exports.getStudents =
  async (req, res) => {

    try {

      const students =
        await Student.find()

      res.status(200).json({

        success: true,

        students

      })

    }

    catch (error) {

      res.status(500).json({

        success: false,

        message:
          "Server Error"

      })

    }

}



/* =========================
   DELETE STUDENT
========================= */

exports.deleteStudent =
  async (req, res) => {

    try {

      await Student.findByIdAndDelete(
        req.params.id
      )

      res.status(200).json({

        success: true,

        message:
          "Student Deleted"

      })

    }

    catch (error) {

      res.status(500).json({

        success: false,

        message:
          "Server Error"

      })

    }

}

/* =========================
   UPDATE STUDENT
========================= */

exports.updateStudent =
  async (req, res) => {

    try {

      const updatedStudent =
        await Student.findByIdAndUpdate(

          req.params.id,

          req.body,

          { new: true }

        )

      res.status(200).json({

        success: true,

        message:
          "Student Updated",

        updatedStudent

      })

    }

    catch (error) {

      res.status(500).json({

        success: false,

        message:
          "Server Error"

      })

    }

}