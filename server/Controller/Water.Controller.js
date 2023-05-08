import Water from '../Model/Water.Model.js';

// Controller to handle creating a new water data entry
const createWaterData = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const water = new Water({
          ...req.body
        });


        const savedWater = await water.save();
        res.status(201).json(savedWater);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Controller to handle retrieving all water data entries
const getAllWaterData = async (req, res) => {
    try {
      const waters = await Water.find({});
      res.status(200).json(waters);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

// Controller to handle retrieving a specific water data entry
const getWaterDataById = async (req, res) => {
    try {
        const water = await Water.findById(req.params.id);
        if (!water) {
            res.status(404).json({ error: 'Water data entry not found' });
        } else {
            res.status(200).json(water);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Controller to handle updating a specific water data entry
const updateWaterData = async (req, res) => {
    try {
        const water = await Water.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!water) {
            res.status(404).json({ error: 'Water data entry not found' });
        } else {
            res.status(200).json(water);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Controller to handle deleting a specific water data entry
const deleteWaterData = async (req, res) => {
    try {
      const water = await Water.findByIdAndDelete(req.params.id);
      if (!water) {
        res.status(404).json({ error: 'Water data entry not found' });
      } else {
        res.status(204).send("Delete Done");
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

export { createWaterData, getAllWaterData, getWaterDataById, updateWaterData, deleteWaterData };