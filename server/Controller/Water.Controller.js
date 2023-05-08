import Water from '../Model/Water.Model';

// Controller to handle creating a new water data entry
const createWaterData = (req, res) => {
    const water = new Water({
        P: req.body.P,
        T: req.body.T,
        p: req.body.p,
        t: req.body.t,
        v: req.body.v,
        I: req.body.I,
        city: req.body.city,
        street: req.body.street,
        number: req.body.number
    });

    water.save((err) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(201).json(water);
        }
    });
};

// Controller to handle retrieving all water data entries
const getAllWaterData = (req, res) => {
    Water.find({}, (err, waters) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(200).json(waters);
        }
    });
};

// Controller to handle retrieving a specific water data entry
const getWaterDataById = (req, res) => {
    Water.findById(req.params.id, (err, water) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!water) {
            res.status(404).json({ error: 'Water data entry not found' });
        } else {
            res.status(200).json(water);
        }
    });
};

// Controller to handle updating a specific water data entry
const updateWaterData = (req, res) => {
    Water.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, water) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!water) {
            res.status(404).json({ error: 'Water data entry not found' });
        } else {
            res.status(200).json(water);
        }
    });
};

// Controller to handle deleting a specific water data entry
const deleteWaterData = (req, res) => {
    Water.findByIdAndDelete(req.params.id, (err, water) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!water) {
            res.status(404).json({ error: 'Water data entry not found' });
        } else {
            res.status(204).send();
        }
    });
};

module.exports = { createWaterData, getAllWaterData, getWaterDataById, updateWaterData, deleteWaterData };