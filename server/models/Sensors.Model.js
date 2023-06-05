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
      type: mongoose.Schema.Types.ObjectId,
      ref: "System", // Reference to the sensor system
    },
    Trigger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TriggerType", // Reference to the "Trigger" model
    },
  },
  { timestamps: true }
);

const Sensors = mongoose.model("Sensors", SensorsSchema);

export default Sensors;
