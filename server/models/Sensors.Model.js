import mongoose, { Mongoose } from "mongoose";

const SensorsSchema = new mongoose.Schema(
  {
    sensorName: {
      type: String,
      default: "sim",
    },
    sensorType: {
      type: String,
    },
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
