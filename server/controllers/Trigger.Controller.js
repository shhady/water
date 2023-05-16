import Trigger from "../models/Trigger.Model.js";

// @desc    Get all triggers
// @route   GET /triggers
// @access  Public
const getTriggers = async (req, res) => {
  try {
    const triggers = await Trigger.find();
    res.status(200).json(triggers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const generateTriggers = async (req, res) => {
  try {
    let triggersLimit = req.body.triggersLimit;
    let meaning = req.body.meaning;
    let numberOffset = req.body.numberOffset;
    let numberLimit = req.body.numberLimit;
    let systems = req.body.systems;

    for (let i = 0; i < numberLimit; i++) {
      const trigger = Math.floor(Math.random() * triggersLimit);
      const number = numberOffset + i + 1;
      const index = Math.floor(Math.random() * systems.length);
      const system = systems[index];

      await Trigger.create({ trigger, number, meaning, system });
    }

    res.status(200).send("Triggers generated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// @desc    Get a single trigger
// @route   GET /triggers/:id
// @access  Public
const getTriggerById = async (req, res) => {
  try {
    const trigger = await Trigger.findById(req.params.id);
    if (!trigger) {
      return res.status(404).json({ error: "Trigger not found" });
    }
    res.status(200).json(trigger);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc    Create a new trigger
// @route   POST /triggers
// @access  Public
const createTrigger = async (req, res) => {
  try {
    const { trigger, meaning, number, system } = req.body;
    const newTrigger = await Trigger.create({
      trigger,
      meaning,
      number,
      system,
    });
    res.status(201).json(newTrigger);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" + error.message });
  }
};

// @desc    Update a trigger
// @route   PUT /triggers/:id
// @access  Public
const updateTrigger = async (req, res) => {
  try {
    const { trigger, meaning, number, system, status } = req.body;
    const updatedTrigger = await Trigger.findByIdAndUpdate(
      req.params.id,
      { trigger, meaning, number, system, status },
      { new: true }
    );
    if (!updatedTrigger) {
      return res.status(404).json({ error: "Trigger not found" });
    }
    res.status(200).json(updatedTrigger);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc    Delete a trigger
// @route   DELETE /triggers/:id
// @access  Public
const deleteTrigger = async (req, res) => {
  try {
    const deletedTrigger = await Trigger.findByIdAndDelete(req.params.id);
    if (!deletedTrigger) {
      return res.status(404).json({ error: "Trigger not found" });
    }
    res.status(200).json({ message: "Trigger deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  getTriggers,
  getTriggerById,
  createTrigger,
  updateTrigger,
  deleteTrigger,
  generateTriggers,
};
