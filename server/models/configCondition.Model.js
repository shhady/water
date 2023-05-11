import mongoose from "mongoose";

const configConditionSchema = new mongoose.Schema(
  {
    autoGenerator: { type: Boolean, required: true },
    systemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trigger",
      required: true,
    },
    previousSystemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Identifier",
      required: true,
    },
    trigger: { type: Number, required: true },
    type: { type: String, required: true },
    triggerName: { type: String, required: true },
    measuredValue: { type: String, required: true },
    valueType: { type: String },
    level: { type: String },
  },
  { timestamps: true }
);

const ConfigCondition = mongoose.model(
  "ConfigCondition",
  configConditionSchema
);

export default ConfigCondition;
