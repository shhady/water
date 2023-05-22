import express from "express";
import {
    getAllConnection,
    createConnection,
    getConnection,
    updateConnection,
    deleteConnection,
    getConnectionsByTriggers
} from "../controllers/Connection.Controller.js";

const router = express.Router();

router.get("/", getAllConnection);
router.post("/", createConnection);
router.post("/Triggers", getConnectionsByTriggers);
router.get("/:id", getConnection);
router.put("/:id", updateConnection);
router.delete("/:id", deleteConnection);

export default router;
