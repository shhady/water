import mongoose from "mongoose";

const triggerSchema = new mongoose.Schema(
  {
    //trigger type is type of quality water or cyber attack
    triggerType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TriggerType",
      required: true,
    },
    //if the problem has been solved or not
    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Trigger = mongoose.model("Trigger", triggerSchema);

export default Trigger;
