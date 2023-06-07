import express from "express";
import {
  getTriggers,
  getTriggerById,
  createTrigger,
  updateTrigger,
  deleteTrigger,
  deleteAllTriggers,
} from "../controllers/Trigger.Controller.js";

const router = express.Router();

// GET /triggers
router.get("/", getTriggers);
// POST /triggers
router.post("/", createTrigger);

// DELETE /triggers/all
router.delete("/", deleteAllTriggers);

// GET /triggers/:id
router.get("/:id", getTriggerById);

// PUT /triggers/:id
router.put("/:id", updateTrigger);

// DELETE /triggers/:id
router.delete("/:id", deleteTrigger);

export default router;
