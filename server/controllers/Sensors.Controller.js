import Sensors from "../models/Sensors.Model.js";
import Trigger from "../models/Trigger.Model.js"; // Assuming the Trigger model is defined in a separate file
import TriggerType from "../models/TriggerType.Model.js"; // Assuming the TriggerType model is defined in a separate file

// @desc    Get all sensors with trigger and triggerType
// @route   GET /sensors
// @access  Public
const getAllSensors = async (req, res) => {
  try {
    const sensors = await Sensors.find()
      .populate({
        path: "Trigger",
        populate: {
          path: "triggerType",
        },
      })
      .exec();

    res.status(200).json(sensors);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc    Create a new sensor
// @route   POST /sensors
// @access  Public
const createSensors = async (req, res) => {
  try {
    const { System, SystemNumber, Trigger, sensorName, sensorType } = req.body;

    // Create a new sensor instance
    const newSensor = new Sensors({
      System,
      SystemNumber,
      Trigger,
      sensorName,
      sensorType,
    });

    // Save the new sensor to the database
    const savedSensor = await newSensor.save();

    res.status(201).json(savedSensor);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//@desc Get Sensors by ID
//@route GET /:id
//@access public
const getSensors = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid id");
    const data = await Sensors.findById(id)
      .populate({
        path: "Trigger",
        populate: {
          path: "triggerType",
        },
      })
      .exec();
    if (!data) throw new Error("Server error, failed to create data");
    res.status(200).json({ data: data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc Update Sensors by ID
//@route PUT /:id
//@access public
const updateSensors = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid id");
    const updatedData = await Sensors.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!updatedData) throw new Error("Failed to update data");
    res.status(200).json({ data: updatedData });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc Delete Sensors by ID
//@route DELETE /:id
//@access public
const deleteSensors = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid id");
    const data = await Sensors.findByIdAndDelete(id);
    if (!data) throw new Error("Failed to update data");
    res.status(200).json({ data: data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export {
  getAllSensors,
  createSensors,
  getSensors,
  updateSensors,
  deleteSensors,
};
