import mongoose from "mongoose";

const mainWaterProblemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // Reference to sub-problems schema
  subProblems: {
    type: [String],
  },
});

const MainWaterProblem = mongoose.model(
  "mainWaterProblem",
  mainWaterProblemSchema
);

export default MainWaterProblem;
