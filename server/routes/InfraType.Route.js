import express from "express";
import {
    getAllInfraType,
    createInfraType,
    getInfraType,
    updateInfraType,
    deleteInfraType,
    deleteAllInfraType,
} from "../controllers/InfraType.Controller.js";

const router = express.Router();

router.get("/", getAllInfraType);
router.delete("/", deleteAllInfraType);
router.post("/", createInfraType);
router.get("/:id", getInfraType);
router.put("/:id", updateInfraType);
router.delete("/:id", deleteInfraType);

export default router;
