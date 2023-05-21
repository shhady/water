import mongoose from "mongoose";

const parameterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    unit: { type: String, default: "" },
    ranges: [
      {
        message: {
          type: String,
          required: true,
        },
        min: {
          type: Number,
          default: null,
        },
        max: {
          type: Number,
          default: null,
        },
      },
    ],
  },
  { timestamps: true }
);

const Parameter = mongoose.model("Parameter", parameterSchema);

export default Parameter;
