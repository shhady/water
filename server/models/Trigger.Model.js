import mongoose from "mongoose";

const triggerSchema = new mongoose.Schema(
  {
    triggerName: { type: String, required: true },
    triggerType: { type: String, required: true },
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
    value: {
      type: Number,
      default: null,
    },
    status: { type: Boolean, default: false }, // if the trigger has been resolved
  },
  { timestamps: true }
);

const Trigger = mongoose.model("Trigger", triggerSchema);

export default Trigger;
