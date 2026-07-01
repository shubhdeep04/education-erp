import express from "express";
import {
  getInstitutes,
  onboardInstitute,
  updateInstitute,
  toggleInstituteStatus,
  deleteInstitute,
} from "../controllers/instituteController.js";

const router = express.Router();

// TODO: add a super-admin auth middleware here once ready
// e.g. router.use(verifySuperAdmin)

router.get("/institutes", getInstitutes);
router.post("/institutes", onboardInstitute);
router.put("/institutes/:id", updateInstitute);
router.patch("/institutes/:id/toggle-status", toggleInstituteStatus);
router.delete("/institutes/:id", deleteInstitute);

export default router;