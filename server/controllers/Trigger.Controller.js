import Trigger from "../models/Trigger.Model.js";
import Sensors from "../models/Sensors.Model.js";

// Get all triggers
const getTriggers = async (req, res) => {
  try {
    const triggers = await Trigger.find();
    res.json(triggers);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
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
    res.json(trigger);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new trigger
const createTrigger = async (req, res) => {
  const { sensorId } = req.body;
  try {
    const sensor = await Sensors.findById(sensorId).populate("Trigger");
    if (!sensor) {
      return res.status(404).json({ message: "Sensor not found" });
    }

    const { number, name, type } = sensor.Trigger;

    const newTrigger = await Trigger.create({
      sensorName: sensor.sensorName,
      sensorType: sensor.sensorType,
      System: sensor.System,
      SystemNumber: sensor.SystemNumber,
      triggerNumber: number,
      triggerName: name,
      triggerType: type,
    });

    res.status(201).json(newTrigger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing trigger by ID
const updateTrigger = async (req, res) => {
  const { id } = req.params;
  const { triggerNumber, triggerName, triggerType } = req.body;
  try {
    const updatedTrigger = await Trigger.findByIdAndUpdate(
      id,
      {
        triggerNumber,
        triggerName,
        triggerType,
      },
      { new: true }
    );
    if (!updatedTrigger) {
      return res.status(404).json({ message: "Trigger not found" });
    }
    res.json(updatedTrigger);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a trigger by ID
const deleteTrigger = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTrigger = await Trigger.findByIdAndDelete(id);
    if (!deletedTrigger) {
      return res.status(404).json({ message: "Trigger not found" });
    }
    res.json({ message: "Trigger deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getTriggers,
  getTriggerById,
  createTrigger,
  updateTrigger,
  deleteTrigger,
};
