import express from "express";
import {
    getAllSensors,
    createSensors,
    getSensors,
    updateSensors,
    deleteSensors,
} from "../controllers/Sensors.Controller.js";

const router = express.Router();

router.get("/", getAllSensors);
router.post("/", createSensors);
router.get("/:id", getSensors);
router.put("/:id", updateSensors);
router.delete("/:id", deleteSensors);

export default router;
