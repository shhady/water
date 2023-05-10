import express from "express";
import {
  getIdentifiers,
  getIdentifierById,
  createIdentifier,
  updateIdentifier,
  deleteIdentifier,
  generateIdentifiers,
} from "../controllers/Identifiers.Controller.js";

const router = express.Router();

// GET /identifiers
router.get("/", getIdentifiers);
// POST /identifiers
router.post("/", createIdentifier);
router.post("/generate", generateIdentifiers);

// GET /identifiers/:id
router.get("/:id", getIdentifierById);
// PUT /identifiers/:id
router.put("/:id", updateIdentifier);
// DELETE /identifiers/:id
router.delete("/:id", deleteIdentifier);

export default router;
