import express from "express";
import {
  getConfigConditions,
  getConfigConditionById,
  createConfigCondition,
  updateConfigCondition,
  deleteConfigCondition,
  generateConfigConditions,
} from "../controllers/configCondition.Controller.js";

const router = express.Router();

// GET /configConditions
router.get("/", getConfigConditions);
// POST /configConditions
router.post("/", createConfigCondition);
router.post("/generate", generateConfigConditions);

// GET /configConditions/:id
router.get("/:id", getConfigConditionById);
// PUT /configConditions/:id
router.put("/:id", updateConfigCondition);
// DELETE /configConditions/:id
router.delete("/:id", deleteConfigCondition);

export default router;