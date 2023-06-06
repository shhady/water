import express from "express";
import {
    getAllSystem,
    createSystem,
    getSystem,
    updateSystem,
    deleteSystem,
} from "../controllers/System.Controller.js";

const router = express.Router();

router.get("/", getAllSystem);
router.post("/", createSystem);
router.get("/:id", getSystem);
router.put("/:id", updateSystem);
router.delete("/:id", deleteSystem);

export default router;
