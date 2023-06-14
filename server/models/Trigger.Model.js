import mongoose from "mongoose";

const triggerSchema = new mongoose.Schema(
  {
    triggerName: { type: String, required: true },
    triggerType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TriggerType", // Reference to the water infrastructure parent
    },
    validValueH: {
      type: Number,
      default: null,
    },
    validValueL: {
      type: Number,
      default: null,
    },
    valueType: {
      type: String, // unit of measurement
      default: null,
    },
    status: { type: Boolean, default: true }, // if the trigger has been resolved
  },
  { timestamps: true }
);

const Trigger = mongoose.model("Trigger", triggerSchema);

export default Trigger;
