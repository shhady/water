import Sensors from "../models/Sensors.Model.js";

// Get all sensors
const getAllSensors = async (req, res) => {
  try {
    const sensors = await Sensors.find().populate("Trigger");
    res.json(sensors);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new sensor
const createSensors = async (req, res) => {
  const { sensorName, sensorType, System, SystemNumber, Trigger } = req.body;
  try {
    const newSensor = await Sensors.create({
      sensorName,
      sensorType,
      System,
      SystemNumber,
      Trigger,
    });
    res.status(201).json(newSensor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single sensor by ID
const getSensors = async (req, res) => {
  const { id } = req.params;
  try {
    const sensor = await Sensors.findById(id).populate("Trigger");
    if (!sensor) {
      return res.status(404).json({ message: "Sensor not found" });
    }
    res.json(sensor);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an existing sensor by ID
const updateSensors = async (req, res) => {
  const { id } = req.params;
  const { sensorName, sensorType, System, SystemNumber, Trigger } = req.body;
  try {
    const updatedSensor = await Sensors.findByIdAndUpdate(
      id,
      {
        sensorName,
        sensorType,
        System,
        SystemNumber,
        Trigger,
      },
      { new: true }
    ).populate("Trigger");
    if (!updatedSensor) {
      return res.status(404).json({ message: "Sensor not found" });
    }
    res.json(updatedSensor);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a sensor by ID
const deleteSensors = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSensor = await Sensors.findByIdAndDelete(id);
    if (!deletedSensor) {
      return res.status(404).json({ message: "Sensor not found" });
    }
    res.json({ message: "Sensor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getAllSensors,
  createSensors,
  getSensors,
  updateSensors,
  deleteSensors,
};
