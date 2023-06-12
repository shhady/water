import express from "express";
import {
  getMultipleArrays,
  createArray,
  getArray,
  updateArray,
  deleteArray,
  deleteAllArray,
} from "../controllers/Array.Controller.js";

const router = express.Router();

router.put("/", getMultipleArrays);
router.delete("/", deleteAllArray);
router.post("/", createArray);
router.get("/:name", getArray);
router.put("/:name", updateArray);
router.delete("/:name", deleteArray);

export default router;
