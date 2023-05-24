import mongoose, { Mongoose } from "mongoose";

const SensorsSchema = new mongoose.Schema(
  {
    System: {
      type: String,
    },
    SystemNumber: {
      type: Number,
    },
    Trigger: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Sensors = mongoose.model("Sensors", SensorsSchema);

export default Sensors;
