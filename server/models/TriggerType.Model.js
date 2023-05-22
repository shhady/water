import mongoose from "mongoose";

const TriggerTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});

const TriggerType = mongoose.model("TriggerType", TriggerTypeSchema);

export default TriggerType;
