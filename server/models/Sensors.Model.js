import mongoose from "mongoose";

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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trigger", // Reference to the "Trigger" model
    },
    sensorName: {
      type: String,
      default: "sim",
    },
    sensorType: {
      type: String,
    },
  },
  { timestamps: true }
);

const Sensors = mongoose.model("Sensors", SensorsSchema);

export default Sensors;
