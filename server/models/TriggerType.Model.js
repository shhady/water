import mongoose from "mongoose";

const TriggerTypeSchema = new mongoose.Schema({
  //type of the problem like opacity or blackmail
  triggerTypeString: {
    type: String,
    required: true,
    unique: true,
  },
  //type of problem like quality water or cyber attack
  description: {
    type: String,
    required: true,
  },
  status: { type: Boolean, default: true }, // if the trigger has been resolved
});

const TriggerType = mongoose.model("TriggerType", TriggerTypeSchema);

export default TriggerType;
