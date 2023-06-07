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
    infrastructureParent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WaterInfrastructure", // Reference to the water infrastructure parent
    },
    sensorProductId: {
      type: Number,
      required: true,
    },
    sensorAttribute: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Sensors = mongoose.model("Sensors", SensorsSchema);

export default Sensors;
