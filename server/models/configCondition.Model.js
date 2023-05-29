import mongoose from "mongoose";

const configConditionSchema = new mongoose.Schema(
  {
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
    parameter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parameter",
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ConfigCondition = mongoose.model(
  "ConfigCondition",
  configConditionSchema
);

export default ConfigCondition;
