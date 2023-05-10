import ConfigCondition from "../models/configCondition.Model.js";

// Get all config conditions
const getConfigConditions = async (req, res) => {
  try {
    const configConditions = await ConfigCondition.find();
    res.json(configConditions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch config conditions" });
  }
};

// Get config condition by ID
const getConfigConditionById = async (req, res) => {
  try {
    const { id } = req.params;
    const configCondition = await ConfigCondition.findById(id);

    if (!configCondition) {
      return res.status(404).json({ error: "Config condition not found" });
    }

    res.json(configCondition);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch config condition" });
  }
};

// Create a new config condition
const createConfigCondition = async (req, res) => {
  try {
    const configConditionData = req.body;
    const configCondition = await ConfigCondition.create(configConditionData);
    res.status(201).json(configCondition);
  } catch (error) {
    res.status(500).json({ error: "Failed to create config condition" });
  }
};

// Update config condition by ID
const updateConfigCondition = async (req, res) => {
  try {
    const { id } = req.params;
    const configConditionData = req.body;
    const configCondition = await ConfigCondition.findByIdAndUpdate(
      id,
      configConditionData,
      { new: true }
    );

    if (!configCondition) {
      return res.status(404).json({ error: "Config condition not found" });
    }

    res.json(configCondition);
  } catch (error) {
    res.status(500).json({ error: "Failed to update config condition" });
  }
};

// Delete config condition by ID
const deleteConfigCondition = async (req, res) => {
  try {
    const { id } = req.params;
    const configCondition = await ConfigCondition.findByIdAndDelete(id);

    if (!configCondition) {
      return res.status(404).json({ error: "Config condition not found" });
    }

    res.json({ message: "Config condition deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete config condition" });
  }
};

export {
  getConfigConditions,
  getConfigConditionById,
  createConfigCondition,
  updateConfigCondition,
  deleteConfigCondition,
};
