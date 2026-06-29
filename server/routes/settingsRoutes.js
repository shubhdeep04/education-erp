import express from "express";
import { getFooterSettings, updateFooterSettings } from "../controllers/settingsController.js";

const router = express.Router();

router.get("/footer",  getFooterSettings);
router.put("/footer",  updateFooterSettings);

export default router;