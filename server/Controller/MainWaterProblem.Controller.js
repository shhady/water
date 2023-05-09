import MainWaterProblem from "../Model/MainWaterProblem.Model.js";

// Create a new main water problem with sub-problems
const createMainWaterProblem = async (req, res) => {
  try {
    const { name, subProblems } = req.body;

    const mainWaterProblem = new MainWaterProblem({
      name,
      subProblems,
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
    const mainWaterProblems = await MainWaterProblem.find({});

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

    const deletedMainWaterProblem = await MainWaterProblem.findByIdAndDelete(
      id
    );

    if (!deletedMainWaterProblem) {
      return res.status(404).json({ message: "Main water problem not found" });
    }

    res.status(200).json({ message: "Main water problem deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting main water problem" });
  }
};

// Add a sub problem to a main problem
const addSubProblem = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid ID");
    let problem = await MainWaterProblem.findById(id);
    if (!problem) throw new Error("Cannot find problem");
    const subProblem = req.body.sub_problem;
    if (!subProblem) throw new Error("Invalid body sub_problem");
    problem.subProblems.push(subProblem);
    await MainWaterProblem.findByIdAndUpdate(id, problem);
    res.status(200).json({ data: problem });
  } catch (e) {
    console.log(error);
    res.status(500).json({ message: "Error adding sub problem" });
  }
};

// Remove a sub problem from a main problem
const removeSubProblem = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid ID");
    let problem = await MainWaterProblem.findById(id);
    if (!problem) throw new Error("Cannot find problem");
    const subProblem = req.body.sub_problem;
    if (!subProblem) throw new Error("Invalid body sub_problem");
    problem.subProblems = problem.subProblems.filter((sub) => {
      return sub != subProblem;
    });
    await MainWaterProblem.findByIdAndUpdate(id, problem);
    res.status(200).json({ data: problem });
  } catch (e) {
    console.log(error);
    res.status(500).json({ message: "Error removing sub problem" });
  }
};

export {
  createMainWaterProblem,
  getAllMainWaterProblems,
  updateMainWaterProblem,
  deleteMainWaterProblem,
  addSubProblem,
  removeSubProblem,
};
