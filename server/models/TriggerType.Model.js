import mongoose from "mongoose";

const TriggerTypeSchema = new mongoose.Schema({
  //type of the problem like opacity or blackmail
  name: {
    type: String,
    required: true,
    unique: true,
  },
  //type of problem like quality water or cyber attack
  type: {
    type: String,
    required: true,
  },
  //number of a trigger between 1-10 or more
  number: {
    type: Number,
    required: true,
  },
});

const TriggerType = mongoose.model("TriggerType", TriggerTypeSchema);

export default TriggerType;
