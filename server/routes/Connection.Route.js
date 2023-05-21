import express from "express";
import {
    getAllConnection,
    createConnection,
    getConnection,
    updateConnection,
    deleteConnection,
} from "../controllers/Connection.Controller.js";

const router = express.Router();

router.get("/", getAllConnection);
router.post("/", createConnection);
router.get("/:id", getConnection);
router.put("/:id", updateConnection);
router.delete("/:id", deleteConnection);

export default router;
