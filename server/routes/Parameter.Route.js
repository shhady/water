import express from "express";
import {
  createParameter,
  getParameters,
  getParameterById,
  updateParameter,
  deleteParameter,
  checkMessage,
} from "../controllers/Parameter.Controller.js";

const router = express.Router();

// Routes for parameter
router.get("/", getParameters);
router.post("/", createParameter);
router.get("/:id", getParameterById);
router.put("/:id", updateParameter);
router.delete("/:id", deleteParameter);
router.post("/:id/check-message", checkMessage);

export default router;
