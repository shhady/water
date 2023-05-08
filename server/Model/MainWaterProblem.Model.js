import mongoose from "mongoose";

const mainWaterProblemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // Reference to sub-problems schema
    subProblems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubProblem'
    }]
});

const MainWaterProblem = mongoose.model("mainWaterProblem", mainWaterProblemSchema);

export default MainWaterProblem;