import System from "../models/System.Model.js";

//@desc Get all System
//@route GET /
//@access public
const getAllSystem = async (req, res) => {
    try {
        const data = await System.find({});
        if(!data) 
            throw new Error("Server error, failed to fetch data");
        res.status(200).json({data: data});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

//@desc Create new System
//@route POST /
//@access public
const createSystem = async (req, res) => {
    try {
        const data = await System.create({...req.body});
        if(!data) throw new Error("Server error, failed to create data");
        res.status(201).json({data: data});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

//@desc Get System by ID
//@route GET /:id
//@access public
const getSystem = async (req,res) => {
    try {
        const id = req.params.id;
        if(!id) throw new Error("Invalid id")
        const data = await System.findById(id);
        if(!data) throw new Error("Server error, failed to create data");
        res.status(200).json({data: data});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

//@desc Update System by ID
//@route PUT /:id
//@access public
const updateSystem = async (req,res) => {
    try {
        const id = req.params.id;
        if(!id) throw new Error("Invalid id")
        const updatedData = await System.findByIdAndUpdate(
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


//@desc Delete System by ID
//@route DELETE /:id
//@access public
const deleteSystem = async (req,res) => {
    try {
        const id = req.params.id;
        if(!id) throw new Error("Invalid id")
        const data = await System.findByIdAndDelete(id);
        if(!data) throw new Error("Failed to update data");
        res.status(200).json({data: data});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

export {
    getAllSystem,
    createSystem,
    getSystem,
    updateSystem,
    deleteSystem,
};


