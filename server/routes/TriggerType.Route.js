import express from "express";
import {
    getAllTriggerType,
    createTriggerType,
    getTriggerType,
    updateTriggerType,
    deleteTriggerType,
} from "../controllers/TriggerType.Controller.js";

const router = express.Router();

router.get("/", getAllTriggerType);
router.post("/", createTriggerType);
router.get("/:id", getTriggerType);
router.put("/:id", updateTriggerType);
router.delete("/:id", deleteTriggerType);

export default router;
