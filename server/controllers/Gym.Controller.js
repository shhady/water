const Gym = require("../models/Gym.Model.js");

//@desc Get all Gym
//@route GET /
//@access public
const getAllGym = async (req, res) => {
    try {
        const data = await Gym.find({});
        if(!data) 
            throw new Error("Server error, failed to fetch data");
        res.status(200).json({data: data});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

//@desc Create new Gym
//@route POST /
//@access public
const createGym = async (req, res) => {
    try {
        const data = await Gym.create({...req.body});
        if(!data) throw new Error("Server error, failed to create data");
        res.status(201).json({data: data});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

//@desc Get Gym by ID
//@route GET /:id
//@access public
const getGym = async (req,res) => {
    try {
        const id = req.params.id;
        if(!id) throw new Error("Invalid id")
        const data = await Gym.findById(id);
        if(!data) throw new Error("Server error, failed to create data");
        res.status(200).json({data: data});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

//@desc Update Gym by ID
//@route PUT /:id
//@access public
const updateGym = async (req,res) => {
    try {
        const id = req.params.id;
        if(!id) throw new Error("Invalid id")
        const updatedData = await Gym.findByIdAndUpdate(
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


//@desc Delete Gym by ID
//@route DELETE /:id
//@access public
const deleteGym = async (req,res) => {
    try {
        const id = req.params.id;
        if(!id) throw new Error("Invalid id")
        const data = await Gym.findByIdAndDelete(id);
        if(!data) throw new Error("Failed to update data");
        res.status(200).json({data: data});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

export {
    getAllGym,
    createGym,
    getGym,
    updateGym,
    deleteGym,
};


