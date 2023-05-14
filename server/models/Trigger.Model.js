import mongoose from "mongoose";

const triggerSchema = new mongoose.Schema(
  {
    trigger: { type: Number, required: true },
    meaning: { type: String, required: true },
    number: { type: Number, required: true },
    system: { type: String, required: true },
    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Trigger = mongoose.model("Trigger", triggerSchema);

export default Trigger;