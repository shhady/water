import Array from "../models/Array.Model.js";

//@desc Get specific Arrays
//@route PUT /
//@access public
const getMultipleArrays = async (req, res) => {
  try {
    const { names } = req.body;
    const arrays = await Array.find({ name: { $in: names } });
    const mappedArrays = arrays.map((array) => array.data);
    res.status(200).json(mappedArrays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc Create new Array
//@route POST /
//@access public
const createArray = async (req, res) => {
  try {
    const data = await Array.create({ ...req.body });
    if (!data) throw new Error("Server error, failed to create data");
    res.status(201).json(data.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc Get Array by Name
//@route GET /name
//@access public
const getArray = async (req, res) => {
  try {
    const { name } = req.params;
    if (!name) throw new Error("Invalid name");
    const array = await Array.findOne({ name });
    if (!array) throw new Error("Array not found");
    res.status(200).json(array.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc Update Array by Name
//@route PUT /name
//@access public
const updateArray = async (req, res) => {
  try {
    const { name } = req.params;
    const data = req.body;

    if (!name) throw new Error("Invalid name");

    const updatedArray = await Array.findOneAndUpdate({ name }, data, {
      new: true,
    });

    if (!updatedArray) throw new Error("Failed to update array");

    res.status(200).json(updatedArray.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc Delete Array by Name
//@route DELETE /name
//@access public
const deleteArray = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) throw new Error("Invalid name");

    const deletedArray = await Array.findOneAndDelete({ name });

    if (!deletedArray) throw new Error("Failed to delete array");

    res.status(200).json(deletedArray.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc Delete all Array
//@route DELETE /
//@access public
const deleteAllArray = async (req, res) => {
  try {
    await Array.deleteMany();
    res.status(200).json({ message: "All Array deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getMultipleArrays,
  createArray,
  getArray,
  updateArray,
  deleteArray,
  deleteAllArray,
};
