const Connection = require("../models/Connection.Model.js");

//@desc Get all Connection
//@route GET /
//@access public
const getAllConnection = async (req, res) => {
  try {
    const data = await Connection.find({});
    if (!data) throw new Error("Server error, failed to fetch data");
    res.status(200).json({ data: data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc Create new Connection
//@route POST /
//@access public
const createConnection = async (req, res) => {
  try {
    const data = await Connection.create({ ...req.body });
    if (!data) throw new Error("Server error, failed to create data");
    res.status(201).json({ data: data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc get by triggers new Connection
//@route POST /
//@access public
const getConnectionsByTriggers = async (req, res) => {
    try {
      const { parameters } = req.body;
      const data = await Connection.find({ "parameters": { "$in": parameters } });
      if (!data) throw new Error("Server error, failed to fetch data");
      res.status(200).json({ data: data });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
  

//@desc Get Connection by ID
//@route GET /:id
//@access public
const getConnection = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid id");
    const data = await Connection.findById(id);
    if (!data) throw new Error("Server error, failed to create data");
    res.status(200).json({ data: data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc Update Connection by ID
//@route PUT /:id
//@access public
const updateConnection = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid id");
    const updatedData = await Connection.findByIdAndUpdate(
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

//@desc Delete Connection by ID
//@route DELETE /:id
//@access public
const deleteConnection = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid id");
    const data = await Connection.findByIdAndDelete(id);
    if (!data) throw new Error("Failed to update data");
    res.status(200).json({ data: data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export {
  getAllConnection,
  createConnection,
  getConnection,
  updateConnection,
  deleteConnection,
  getConnectionsByTriggers
};
