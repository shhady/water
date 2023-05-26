import mongoose from "mongoose";

const triggerSchema = new mongoose.Schema(
  {
    triggerType: { type: mongoose.Schema.Types.ObjectId, ref: "TriggerType" }, // To get trigger number, trigger name and trigger type
    sensor: { type: mongoose.Schema.Types.ObjectId, ref: "Sensors" }, // To get system data
    status: { type: Boolean, default: false }, // if the trigger has been resolved
  },
  { timestamps: true }
);

const Trigger = mongoose.model("Trigger", triggerSchema);

export default Trigger;
