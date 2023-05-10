import express from "express";
import {
  getIdentifiers,
  getIdentifierById,
  createIdentifier,
  updateIdentifier,
  deleteIdentifier,
} from "../Controller/Identifiers.Controller.js";

const router = express.Router();

// GET /identifiers
router.get("/", getIdentifiers);
// POST /identifiers
router.post("/", createIdentifier);

// GET /identifiers/:id
router.get("/:id", getIdentifierById);
// PUT /identifiers/:id
router.put("/:id", updateIdentifier);
// DELETE /identifiers/:id
router.delete("/:id", deleteIdentifier);

export default router;
