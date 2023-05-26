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
      // pond, tube, tower
      type: String,
    },
    SystemNumber: {
      // number of pond, number of tube, number of tower
      type: Number,
    },
    triggers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trigger",
      },
    ],
  },
  { timestamps: true }
);

const Sensors = mongoose.model("Sensors", SensorsSchema);

export default Sensors;
