import express from "express";
import { createCyber,getAllCyberFiltering } from "../Controller/Cyber.Controller.js";

const router = express.Router();

router.post("/addNew", createCyber);
router.post('/getAllFiltering',getAllCyberFiltering);

export default router;
