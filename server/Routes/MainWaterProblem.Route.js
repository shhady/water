import express from "express";
const router = express.Router();
import {
  createMainWaterProblem,
  getAllMainWaterProblems,
  updateMainWaterProblem,
  deleteMainWaterProblem,
  addSubProblem,
  removeSubProblem,
} from "../Controller/MainWaterProblem.Controller.js";

// Create a new main water problem with sub-problems
router.post("/", createMainWaterProblem);

// Get all main water problems
router.get("/", getAllMainWaterProblems);

// Add a new sub-problem
router.put("/add-sub-problem/:id", addSubProblem);

// Add a new sub-problem
router.put("/remove-sub-problem/:id", removeSubProblem);

// Update a main water problem
router.put("/:id", updateMainWaterProblem);

// Delete a main water problem
router.delete("/:id", deleteMainWaterProblem);

export default router;
