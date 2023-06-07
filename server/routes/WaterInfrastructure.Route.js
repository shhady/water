import express from "express";
import {
  getAllWaterInfrastructure,
  createWaterInfrastructure,
  getWaterInfrastructure,
  updateWaterInfrastructure,
  deleteWaterInfrastructure,
  deleteAllWaterInfrastructure,
} from "../controllers/WaterInfrastructure.Controller.js";

const router = express.Router();

router.get("/", getAllWaterInfrastructure);
router.delete("/", deleteAllWaterInfrastructure);
router.post("/", createWaterInfrastructure);
router.get("/:id", getWaterInfrastructure);
router.put("/:id", updateWaterInfrastructure);
router.delete("/:id", deleteWaterInfrastructure);

export default router;
