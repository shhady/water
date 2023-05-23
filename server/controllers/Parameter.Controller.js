import Parameter from "../models/Parameter.Model.js";

// Create a new parameter
const createParameter = async (req, res) => {
  try {
    const { name, unit, ranges } = req.body;
    const parameter = new Parameter({ name, unit, ranges });
    await parameter.save();
    res.status(201).json(parameter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all parameters
const getParameters = async (req, res) => {
  try {
    const parameters = await Parameter.find();
    res.status(200).json(parameters);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//use to check message in parameter by min and max number
const checkMessage = async (req, res) => {
  try {
    const parameter = await Parameter.findById(req.params.id);
    const { value } = req.body;
    if (value == undefined) {
      throw new Error("invalid value");
    }

    if (!parameter) {
      throw new Error("Parameter not found");
    }

    for (const range of parameter.ranges) {
      if (range.min === null || range.min == range.max) {
        if (value == range.min) {
          res.status(200).json({ message: range.message });
          return;
        }
      }
      if (
        (range.min === null || value >= range.min) &&
        (range.max === null || value < range.max)
      ) {
        res.status(200).json({ message: range.message });
        return;
      }
    }
    res.status(200).json({ message: "" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a parameter by ID
const getParameterById = async (req, res) => {
  try {
    const parameter = await Parameter.findById(req.params.id);
    if (parameter) {
      res.status(200).json(parameter);
    } else {
      res.status(404).json({ message: "Parameter not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a parameter by ID
const updateParameter = async (req, res) => {
  try {
    const { name, unit, ranges } = req.body;
    const parameter = await Parameter.findById(req.params.id);
    if (parameter) {
      parameter.name = name || parameter.name;
      parameter.unit = unit || parameter.unit;
      parameter.ranges = ranges || parameter.ranges;
      await parameter.save();
      res.status(200).json(parameter);
    } else {
      res.status(404).json({ message: "Parameter not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a parameter by ID
const deleteParameter = async (req, res) => {
  try {
    const parameter = await Parameter.findByIdAndDelete(req.params.id);
    if (parameter) {
      res.status(200).json({ message: "Parameter deleted successfully" });
    } else {
      res.status(404).json({ message: "Parameter not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addRange = async (req, res) => {};

export {
  createParameter,
  getParameters,
  getParameterById,
  updateParameter,
  deleteParameter,
  checkMessage,
};
