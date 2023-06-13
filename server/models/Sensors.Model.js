import mongoose from "mongoose";

const SensorsSchema = new mongoose.Schema(
  {
    sensorId: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: null,
    },
    triggerReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trigger", // Reference to the water infrastructure parent
    },
    reservoirParent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservoir", // Reference to the water infrastructure parent
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
      default: null,
    },
    longitude: {
      type: Number,
      default: null,
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
