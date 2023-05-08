import MainWaterProblem from "../Model/MainWaterProblem.Model.js";

// Create a new main water problem with sub-problems
const createMainWaterProblem = async (req, res) => {
    try {
        const { name, subProblems } = req.body;

        const mainWaterProblem = new MainWaterProblem({
            name,
            subProblems
        });

        await mainWaterProblem.save();

        res.status(201).json(mainWaterProblem);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating main water problem" });
    }
};

// Get all main water problems
const getAllMainWaterProblems = async (req, res) => {
    try {
        const mainWaterProblems = await MainWaterProblem.find({}).populate('subProblems');

        res.status(200).json(mainWaterProblems);
    } catch (error) {
        res.status(500).json({ message: "Error getting main water problems" });
    }
};

// Update a main water problem
const updateMainWaterProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, subProblems } = req.body;

        const updatedMainWaterProblem = await MainWaterProblem.findByIdAndUpdate(
            id,
            { name, subProblems },
            { new: true }
        );

        if (!updatedMainWaterProblem) {
            return res.status(404).json({ message: "Main water problem not found" });
        }

        res.status(200).json(updatedMainWaterProblem);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating main water problem" });
    }
};

// Delete a main water problem
const deleteMainWaterProblem = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMainWaterProblem = await MainWaterProblem.findByIdAndDelete(id);

        if (!deletedMainWaterProblem) {
            return res.status(404).json({ message: "Main water problem not found" });
        }

        res.status(200).json({ message: "Main water problem deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting main water problem" });
    }
};

export { createMainWaterProblem, getAllMainWaterProblems, updateMainWaterProblem, deleteMainWaterProblem };
