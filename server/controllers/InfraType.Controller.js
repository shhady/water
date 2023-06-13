import InfraType from "../models/InfraType.Model.js";

//@desc Get all InfraType
//@route GET /
//@access public
const getAllInfraType = async (req, res) => {
    try {
        const data = await InfraType.find({});
        if(!data) 
            throw new Error("Server error, failed to fetch data");
        res.status(200).json({data: data});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

//@desc Create new InfraType
//@route POST /
//@access public
const createInfraType = async (req, res) => {
    try {
        const data = await InfraType.create({...req.body});
        if(!data) throw new Error("Server error, failed to create data");
        res.status(201).json({data: data});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

//@desc Get InfraType by ID
//@route GET /:id
//@access public
const getInfraType = async (req,res) => {
    try {
        const id = req.params.id;
        if(!id) throw new Error("Invalid id")
        const data = await InfraType.findById(id);
        if(!data) throw new Error("Server error, failed to create data");
        res.status(200).json({data: data});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

//@desc Update InfraType by ID
//@route PUT /:id
//@access public
const updateInfraType = async (req,res) => {
    try {
        const id = req.params.id;
        if(!id) throw new Error("Invalid id")
        const updatedData = await InfraType.findByIdAndUpdate(
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


//@desc Delete InfraType by ID
//@route DELETE /:id
//@access public
const deleteInfraType = async (req,res) => {
    try {
        const id = req.params.id;
        if(!id) throw new Error("Invalid id")
        const data = await InfraType.findByIdAndDelete(id);
        if(!data) throw new Error("Failed to update data");
        res.status(200).json({data: data});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

//@desc Delete all InfraType 
//@route DELETE /
//@access public
const deleteAllInfraType = async (req, res) => {
  try {
    await InfraType.deleteMany();
    res.status(200).json({ message: "All InfraType deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
    getAllInfraType,
    createInfraType,
    getInfraType,
    updateInfraType,
    deleteInfraType,
    deleteAllInfraType,
};


