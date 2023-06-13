import express from "express";
import {
  getAllReservoirType,
  createReservoirType,
  getReservoirType,
  updateReservoirType,
  deleteReservoirType,
  deleteAllReservoirType,
} from "../controllers/ReservoirType.Controller.js";

const router = express.Router();

router.get("/", getAllReservoirType);
router.delete("/", deleteAllReservoirType);
router.post("/", createReservoirType);
router.get("/:id", getReservoirType);
router.put("/:id", updateReservoirType);
router.delete("/:id", deleteReservoirType);

export default router;
