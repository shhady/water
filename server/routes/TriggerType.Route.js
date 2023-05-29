import express from "express";
import {
  getAllTriggerType,
  createTriggerType,
  getTriggerType,
  updateTriggerType,
  deleteTriggerType,
  generateTriggerTypes,
} from "../controllers/TriggerType.Controller.js";

const router = express.Router();

router.get("/", getAllTriggerType);
router.post("/", createTriggerType);
router.post("/generate", generateTriggerTypes);
router.get("/:id", getTriggerType);
router.put("/:id", updateTriggerType);
router.delete("/:id", deleteTriggerType);

export default router;
