import mongoose from "mongoose";

const triggerSchema = new mongoose.Schema(
  {
    triggerNumber: { type: Number, required: true },
    triggerName: { type: String, required: true },
    triggerType: { type: String, required: true },
    sensorName: {
      type: String,
      default: "sim",
      required: true,
    },
    sensorType: { type: String, required: true },
    System: { type: String, required: true },
    SystemNumber: { type: Number, required: true },
    status: { type: Boolean, default: false }, // if the trigger has been resolved
  },
  { timestamps: true }
);

const Trigger = mongoose.model("Trigger", triggerSchema);

export default Trigger;
