import Trigger from "../models/Trigger.Model.js";

// Get all triggers
const getTriggers = async (req, res) => {
  try {
    const triggers = await Trigger.find();
    res.status(200).json(triggers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single trigger by ID
const getTriggerById = async (req, res) => {
  const { id } = req.params;

  try {
    const trigger = await Trigger.findById(id);
    if (!trigger) {
      return res.status(404).json({ message: "Trigger not found" });
    }
    res.status(200).json(trigger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new trigger
const createTrigger = async (req, res) => {
  const triggerData = req.body;

  try {
    const newTrigger = new Trigger(triggerData);
    const savedTrigger = await newTrigger.save();
    res.status(201).json(savedTrigger);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing trigger
const updateTrigger = async (req, res) => {
  const { id } = req.params;
  const triggerData = req.body;

  try {
    const existingTrigger = await Trigger.findById(id);
    if (!existingTrigger) {
      return res.status(404).json({ message: "Trigger not found" });
    }

    existingTrigger.set(triggerData);
    const updatedTrigger = await existingTrigger.save();

    res.status(200).json(updatedTrigger);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a trigger
const deleteTrigger = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTrigger = await Trigger.findByIdAndRemove(id);
    if (!deletedTrigger) {
      return res.status(404).json({ message: "Trigger not found" });
    }
    res.status(200).json({ message: "Trigger deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete all triggers
const deleteAllTriggers = async (req, res) => {
  try {
    await Trigger.deleteMany();
    res.status(200).json({ message: "All triggers deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getTriggers,
  getTriggerById,
  createTrigger,
  updateTrigger,
  deleteTrigger,
  deleteAllTriggers,
};
