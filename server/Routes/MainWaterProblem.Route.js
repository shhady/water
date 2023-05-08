import express from "express";
const router = express.Router();
import { createMainWaterProblem, getAllMainWaterProblems, updateMainWaterProblem, deleteMainWaterProblem } from "../Controller/MainWaterProblem.Controller.js";


// Create a new main water problem with sub-problems
router.post("/", createMainWaterProblem);

// Get all main water problems
router.get("/", getAllMainWaterProblems);

// Update a main water problem
router.put("/:id", updateMainWaterProblem);

// Delete a main water problem
router.delete("/:id", deleteMainWaterProblem);

export default router;
