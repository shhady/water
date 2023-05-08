import SubWaterProblem from '../Model/SubProblems.Model.js';

// GET /api/subProblems
const getAllSubProblems = async (req, res) => {
    try {
        const subProblems = await SubWaterProblem.find();
        res.json(subProblems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
const getSubProblemsById = async (req, res) => {
    try {
      const subWaterProblem = await SubWaterProblem.findById(req.params.id);
      if (!subWaterProblem) {
        return res.status(404).json({ error: "Sub water problem not found" });
      }
      res.status(200).json(subWaterProblem);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  };
// POST /api/subProblems
const createSubProblem = async (req, res) => {
    try {
        const newSubProblem = await SubWaterProblem.create(req.body);
        res.json(newSubProblem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// PUT /api/subProblems/:id
const updateSubProblem = async (req, res) => {
    try {
        const updatedSubProblem = await SubWaterProblem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedSubProblem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// DELETE /api/subProblems/:id
const deleteSubProblem = async (req, res) => {
    try {
        const deletedSubProblem = await SubWaterProblem.findByIdAndDelete(
            req.params.id
        );
        res.json(deletedSubProblem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export { getAllSubProblems, createSubProblem, updateSubProblem, deleteSubProblem,getSubProblemsById };
