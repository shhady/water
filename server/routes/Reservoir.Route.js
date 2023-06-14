import express from "express";
import {
  getAllReservoir,
  createReservoir,
  getReservoir,
  updateReservoir,
  deleteReservoir,
  deleteAllReservoir,
} from "../controllers/Reservoir.Controller.js";

const router = express.Router();

router.get("/", getAllReservoir);
router.delete("/", deleteAllReservoir);
router.post("/", createReservoir);
router.get("/:id", getReservoir);
router.put("/:id", updateReservoir);
router.delete("/:id", deleteReservoir);

export default router;
