import express from "express";
import {
  createCyber,
  getAllCyberFiltering,
  getAllCyber,
} from "../controllers/Cyber.Controller.js";

const router = express.Router();

router.get("/", getAllCyber);
router.post("/addNew", createCyber);
router.post("/getAllFiltering", getAllCyberFiltering);

export default router;
