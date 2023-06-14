import Sensors from "../models/Sensors.Model.js";
import Reservoir from "../models/Reservoir.Model.js";

// Get all sensors
const getAllSensors = async (req, res) => {
  try {
    const sensors = await Sensors.find()
      .populate("reservoirParent")
      .populate("triggerReference");
    res.status(200).json(sensors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single sensor by ID
const getSensors = async (req, res) => {
  const { id } = req.params;

  try {
    const sensor = await Sensors.findById(id).populate("reservoirParent");
    if (!sensor) {
      return res.status(404).json({ message: "Sensor not found" });
    }
    res.status(200).json(sensor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new sensor
const createSensors = async (req, res) => {
  const sensorData = req.body;

  try {
    const { sensorId, triggerReference } = sensorData;

    // Check if a sensor with the same sensorId and triggerReference combination already exists
    const existingSensor = await Sensors.findOne({
      sensorId,
      triggerReference,
    });
    if (existingSensor) {
      return res
        .status(400)
        .json({ message: "Sensor with the same combination already exists" });
    }

    const newSensor = new Sensors(sensorData);
    const savedSensor = await newSensor.save();
    res.status(201).json(savedSensor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing sensor
const updateSensors = async (req, res) => {
  const { id } = req.params;
  const sensorData = req.body;

  try {
    const existingSensor = await Sensors.findById(id);
    if (!existingSensor) {
      return res.status(404).json({ message: "Sensor not found" });
    }

    existingSensor.set(sensorData);
    const updatedSensor = await existingSensor.save();

    res.status(200).json(updatedSensor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a sensor
const deleteSensors = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSensor = await Sensors.findByIdAndRemove(id);
    if (!deletedSensor) {
      return res.status(404).json({ message: "Sensor not found" });
    }
    res.status(200).json({ message: "Sensor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete all sensors
const deleteAllSensors = async (req, res) => {
  try {
    await Sensors.deleteMany();
    res.status(200).json({ message: "All sensors deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllSensors,
  createSensors,
  getSensors,
  updateSensors,
  deleteSensors,
  deleteAllSensors,
};
