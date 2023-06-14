import Reservoir from "../models/Reservoir.Model.js";

//@desc Get all Reservoir
//@route GET /
//@access public
const getAllReservoir = async (req, res) => {
  try {
    const data = await Reservoir.find({});
    if (!data) throw new Error("Server error, failed to fetch data");
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc Create new Reservoir
//@route POST /
//@access public
const createReservoir = async (req, res) => {
  try {
    const data = await Reservoir.create({ ...req.body });
    if (!data) throw new Error("Server error, failed to create data");
    res.status(201).json({ data: data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc Get Reservoir by ID
//@route GET /:id
//@access public
const getReservoir = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid id");
    const data = await Reservoir.findById(id);
    if (!data) throw new Error("Server error, failed to create data");
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc Update Reservoir by ID
//@route PUT /:id
//@access public
const updateReservoir = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid id");
    const updatedData = await Reservoir.findByIdAndUpdate(
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

//@desc Delete Reservoir by ID
//@route DELETE /:id
//@access public
const deleteReservoir = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid id");
    const data = await Reservoir.findByIdAndDelete(id);
    if (!data) throw new Error("Failed to update data");
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//delete all water infrastructure
const deleteAllReservoir = async (req, res) => {
  try {
    await Reservoir.deleteMany();
    res
      .status(200)
      .json({ message: "All water infrastructure deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllReservoir,
  createReservoir,
  getReservoir,
  updateReservoir,
  deleteReservoir,
  deleteAllReservoir,
};
