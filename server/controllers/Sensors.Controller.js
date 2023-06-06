import Sensors from "../models/Sensors.Model.js";
import Trigger from "../models/Trigger.Model.js";

// Get all sensors
const getAllSensors = async (req, res) => {
  try {
    const sensors = await Sensors.find().populate("Trigger").populate("System");
    res.json(sensors);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new sensor
const createSensors = async (req, res) => {
  const { sensorName, sensorType, System, Trigger } = req.body;
  try {
    const newSensor = await Sensors.create({
      sensorName,
      sensorType,
      System,
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
    const sensor = await Sensors.findById(id)
      .populate("Trigger")
      .populate("System");
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
  const {
    sensorName,
    sensorType,
    System,
    SystemNumber,
    Trigger: TriggerType,
  } = req.body;
  try {
    const sensor = await Sensors.findById(id)
      .populate("Trigger")
      .populate("System");
    if (!sensor) {
      return res.status(404).json({ message: "Sensor not found" });
    }
    await Trigger.create({
      sensorName: sensor.sensorName,
      sensorType: sensor.sensorType,
      System: sensor.System.name,
      SystemNumber: sensor.System.number,
      triggerNumber: sensor.Trigger.number,
      triggerName: sensor.Trigger.name,
      triggerType: sensor.Trigger.type,
    });

    const updatedSensor = await Sensors.findByIdAndUpdate(
      id,
      {
        sensorName,
        sensorType,
        System,
        Trigger: TriggerType,
      },
      { new: true }
    )
      .populate("Trigger")
      .populate("System");

    res.json(updatedSensor);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
