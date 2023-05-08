import express from "express";
import { getAllSubProblems, createSubProblem, updateSubProblem, deleteSubProblem,getSubProblemsById } from "../Controller/SubProblems.Controller.js";

const router = express.Router();
// Sub Water Problem routes
router.get("/", getAllSubProblems);
router.get("/:id", getSubProblemsById);
router.post("/", createSubProblem);
router.put("/:id", updateSubProblem);
router.delete("/:id", deleteSubProblem);

export default router;
