import Trigger from "../models/Trigger.Model.js";
import TriggerType from "../models/TriggerType.Model.js"; // Import the TriggerType model

// @desc    Get all triggers
// @route   GET /triggers
// @access  Public
const getTriggers = async (req, res) => {
  try {
    const triggers = await Trigger.find()
      .populate("triggerType", "number name type") // Populate the triggerType field with number, name, and type fields
      .populate("sensor"); // Populate the sensor field

    res.status(200).json(triggers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//use to generate fake data
const generateTriggers = async (req, res) => {
  try {
    //we have to create a sensor and a triggerType
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
    const trigger = await Trigger.findById(req.params.id)
      .populate("triggerType", "number name type") // Populate the triggerType field with number, name, and type fields
      .populate("sensor"); // Populate the sensor field

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
    const { name, type, number } = req.body; // Assuming the request body contains the name, type, and number for the new trigger

    // Find the corresponding TriggerType document based on the number
    const triggerType = await TriggerType.findOne({ number });

    if (!triggerType) {
      // If the triggerType does not exist, return an error
      return res.status(404).json({ error: "Trigger type not found" });
    }

    // Create a new trigger document
    const trigger = new Trigger({
      triggerType: triggerType._id, // Assign the TriggerType's ObjectId to the triggerType field
      // Add any other fields you want to populate
      // For example, if you want to assign a sensor, you can use: sensor: req.body.sensorId
      // Assuming the sensorId is provided in the request body
    });

    // Save the trigger to the database
    const savedTrigger = await trigger.save();

    // Return the created trigger
    res.status(201).json({ trigger: savedTrigger });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update a trigger
// @route   PUT /triggers/:id
// @access  Public
const updateTrigger = async (req, res) => {
  try {
    const { triggerType, sensor, status } = req.body;
    const updatedTrigger = await Trigger.findByIdAndUpdate(
      req.params.id,
      { triggerType, sensor, status },
      { new: true }
    )
      .populate("triggerType", "number name type") // Populate the triggerType field with number, name, and type fields
      .populate("sensor"); // Populate the sensor field with the associated Sensors data

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
