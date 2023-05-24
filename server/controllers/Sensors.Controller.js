import Sensors from "../models/Sensors.Model.js";

//@desc Get all Sensors
//@route GET /
//@access public
const getAllSensors = async (req, res) => {
    try {
        const data = await Sensors.find({});
        if(!data) 
            throw new Error("Server error, failed to fetch data");
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

//@desc Create new Sensors
//@route POST /
//@access public
const createSensors = async (req, res) => {
    try {
        const data = await Sensors.create({...req.body});
        if(!data) throw new Error("Server error, failed to create data");
        res.status(201).json({data: data});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

//@desc Get Sensors by ID
//@route GET /:id
//@access public
const getSensors = async (req,res) => {
    try {
        const id = req.params.id;
        if(!id) throw new Error("Invalid id")
        const data = await Sensors.findById(id);
        if(!data) throw new Error("Server error, failed to create data");
        res.status(200).json({data: data});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

//@desc Update Sensors by ID
//@route PUT /:id
//@access public
const updateSensors = async (req,res) => {
    try {
        const id = req.params.id;
        if(!id) throw new Error("Invalid id")
        const updatedData = await Sensors.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        );
        if(!updatedData) throw new Error("Failed to update data");
        res.status(200).json({data: updatedData});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}


//@desc Delete Sensors by ID
//@route DELETE /:id
//@access public
const deleteSensors = async (req,res) => {
    try {
        const id = req.params.id;
        if(!id) throw new Error("Invalid id")
        const data = await Sensors.findByIdAndDelete(id);
        if(!data) throw new Error("Failed to update data");
        res.status(200).json({data: data});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

export {
    getAllSensors,
    createSensors,
    getSensors,
    updateSensors,
    deleteSensors,
};


