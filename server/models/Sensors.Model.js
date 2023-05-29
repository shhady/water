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
      // pond, tube, tower
      type: String,
    },
    SystemNumber: {
      // number of pond, number of tube, number of tower
      type: Number,
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
