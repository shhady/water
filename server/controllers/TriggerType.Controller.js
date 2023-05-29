import TriggerType from "../models/TriggerType.Model.js";

//@desc Get all TriggerType
//@route GET /
//@access public
const getAllTriggerType = async (req, res) => {
  try {
    const data = await TriggerType.find({});
    if (!data) throw new Error("Server error, failed to fetch data");
    res.status(200).json({ data: data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc Generate triggerTypes
//@route POST /generate
//@access public
const generateTriggerTypes = async (req, res) => {
  try {
    const triggerNames = [
      "conductivity",
      "opacity",
      "acidity",
      "chlorine",
      "Permissions",
      "blackmail",
      "spam",
      "fishing",
      "DoS",
      "virus",
    ];
    const typeOFTriggers = {
      Cyber: ["Permissions", "blackmail", "spam", "fishing", "DoS", "virus"],
      "Water Quality": ["conductivity", "opacity", "acidity", "chlorine"],
    };

    triggerNames.forEach(async (trigger, index) => {
      const triggerName = triggerNames[index];
      const type = Object.keys(typeOFTriggers).find((key) =>
        typeOFTriggers[key].includes(triggerName)
      );
      await TriggerType.create({ name: trigger, type, number: index + 1 });
    });

    res.status(201).send("Worked");
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc Create new TriggerType
//@route POST /
//@access public
const createTriggerType = async (req, res) => {
  try {
    console.log(req.body);
    const { name, type, number } = req.body;
    const isExist = await TriggerType.findOne({ name: name });
    if (isExist) {
      throw new Error("Server error, failed to create data is Exist");
    }
    const data = await TriggerType.create({ name, type, number });
    if (!data) throw new Error("Server error, failed to create data");
    res.status(201).json({ data: data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc Get TriggerType by ID
//@route GET /:id
//@access public
const getTriggerType = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid id");
    const data = await TriggerType.findById(id);
    if (!data) throw new Error("Server error, failed to create data");
    res.status(200).json({ data: data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc Update TriggerType by ID
//@route PUT /:id
//@access public
const updateTriggerType = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid id");
    const updatedData = await TriggerType.findByIdAndUpdate(
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

//@desc Delete TriggerType by ID
//@route DELETE /:id
//@access public
const deleteTriggerType = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid id");
    const data = await TriggerType.findByIdAndDelete(id);
    if (!data) throw new Error("Failed to update data");
    res.status(200).json({ data: data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export {
  getAllTriggerType,
  createTriggerType,
  getTriggerType,
  updateTriggerType,
  deleteTriggerType,
  generateTriggerTypes,
};
