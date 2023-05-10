import express from "express";
import {
  getTriggers,
  getTriggerById,
  createTrigger,
  updateTrigger,
  deleteTrigger,
  generateTriggers,
} from "../controllers/Trigger.Controller.js";

const router = express.Router();

// GET /triggers
router.get("/", getTriggers);
router.post("/generate", generateTriggers);
// GET /triggers/:id
router.get("/:id", getTriggerById);

// POST /triggers
router.post("/", createTrigger);

// PUT /triggers/:id
router.put("/:id", updateTrigger);

// DELETE /triggers/:id
router.delete("/:id", deleteTrigger);

export default router;
