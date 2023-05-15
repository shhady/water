import mongoose from "mongoose";

const GymSchema = new mongoose.Schema(
    {   
    },
    { timestamps: true }
);

const Gym = mongoose.model("Gym", GymSchema);

export default Gym;