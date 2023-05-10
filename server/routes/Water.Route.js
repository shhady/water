import express from 'express';
const router = express.Router();

import {createWaterData, getAllWaterData, getWaterDataById, updateWaterData, deleteWaterData } from '../Controller/Water.Controller.js';

// Create a new water data entry
router.post('/', createWaterData);

// Retrieve all water data entries
router.get('/', getAllWaterData);

// Retrieve a specific water data entry by ID
router.get('/:id', getWaterDataById);

// Update a specific water data entry by ID
router.put('/:id', updateWaterData);

// Delete a specific water data entry by ID
router.delete('/:id', deleteWaterData);

export default router;
