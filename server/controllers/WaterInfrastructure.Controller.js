import WaterInfrastructure from "../models/WaterInfrastructure.Model.js";

//@desc Get all WaterInfrastructure
//@route GET /
//@access public
const getAllWaterInfrastructure = async (req, res) => {
  try {
    const data = await WaterInfrastructure.find({});
    if (!data) throw new Error("Server error, failed to fetch data");
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc Create new WaterInfrastructure
//@route POST /
//@access public
const createWaterInfrastructure = async (req, res) => {
  try {
    const data = await WaterInfrastructure.create({ ...req.body });
    if (!data) throw new Error("Server error, failed to create data");
    res.status(201).json({ data: data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc Get WaterInfrastructure by ID
//@route GET /:id
//@access public
const getWaterInfrastructure = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid id");
    const data = await WaterInfrastructure.findById(id);
    if (!data) throw new Error("Server error, failed to create data");
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc Update WaterInfrastructure by ID
//@route PUT /:id
//@access public
const updateWaterInfrastructure = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid id");
    const updatedData = await WaterInfrastructure.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!updatedData) throw new Error("Failed to update data");
    res.status(200).json(updatedData);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc Delete WaterInfrastructure by ID
//@route DELETE /:id
//@access public
const deleteWaterInfrastructure = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid id");
    const data = await WaterInfrastructure.findByIdAndDelete(id);
    if (!data) throw new Error("Failed to update data");
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//delete all water infrastructure
const deleteAllWaterInfrastructure = async (req, res) => {
  try {
    await WaterInfrastructure.deleteMany();
    res
      .status(200)
      .json({ message: "All water infrastructure deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllWaterInfrastructure,
  createWaterInfrastructure,
  getWaterInfrastructure,
  updateWaterInfrastructure,
  deleteWaterInfrastructure,
  deleteAllWaterInfrastructure,
};
