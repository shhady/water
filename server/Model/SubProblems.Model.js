import mongoose from "mongoose";

const subWaterProblemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    parentProbelm:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mainWaterProblem'
    }
});

const SubWaterProblemSchema = mongoose.model("SubProblem", subWaterProblemSchema);

export default SubWaterProblemSchema;