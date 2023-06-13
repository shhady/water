import ReservoirType from "../models/ReservoirType.Model.js";

//@desc Get all ReservoirType
//@route GET /
//@access public
const getAllReservoirType = async (req, res) => {
  try {
    const data = await ReservoirType.find({});
    if (!data) throw new Error("Server error, failed to fetch data");
    res.status(200).json({ data: data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc Create new ReservoirType
//@route POST /
//@access public
const createReservoirType = async (req, res) => {
  try {
    const data = await ReservoirType.create({ ...req.body });
    if (!data) throw new Error("Server error, failed to create data");
    res.status(201).json({ data: data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc Get ReservoirType by ID
//@route GET /:id
//@access public
const getReservoirType = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid id");
    const data = await ReservoirType.findById(id);
    if (!data) throw new Error("Server error, failed to create data");
    res.status(200).json({ data: data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc Update ReservoirType by ID
//@route PUT /:id
//@access public
const updateReservoirType = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid id");
    const updatedData = await ReservoirType.findByIdAndUpdate(
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

//@desc Delete ReservoirType by ID
//@route DELETE /:id
//@access public
const deleteReservoirType = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid id");
    const data = await ReservoirType.findByIdAndDelete(id);
    if (!data) throw new Error("Failed to update data");
    res.status(200).json({ data: data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc Delete all ReservoirType
//@route DELETE /
//@access public
const deleteAllReservoirType = async (req, res) => {
  try {
    await ReservoirType.deleteMany();
    res.status(200).json({ message: "All ReservoirType deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllReservoirType,
  createReservoirType,
  getReservoirType,
  updateReservoirType,
  deleteReservoirType,
  deleteAllReservoirType,
};
