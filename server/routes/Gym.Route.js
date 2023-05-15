import express from "express";
import {
    getAllGym,
    createGym,
    getGym,
    updateGym,
    deleteGym,
} from "../controllers/Gym.Controller.js";

const router = express.Router();

router.get("/", getAllGym);
router.post("/", createGym);
router.get("/:id", getGym);
router.put("/:id", updateGym);
router.delete("/:id", deleteGym);

export default router;
