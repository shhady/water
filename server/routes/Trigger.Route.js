import express from "express";
import {
  getTriggers,
  getTriggerById,
  createTrigger,
  updateTrigger,
  deleteTrigger,
} from "../Controller/Trigger.Controller.js";

const router = express.Router();

// GET /triggers
router.get("/", getTriggers);

// GET /triggers/:id
router.get("/:id", getTriggerById);

// POST /triggers
router.post("/", createTrigger);

// PUT /triggers/:id
router.put("/:id", updateTrigger);

// DELETE /triggers/:id
router.delete("/:id", deleteTrigger);

export default router;
