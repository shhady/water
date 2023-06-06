import mongoose from "mongoose";

const SystemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const System = mongoose.model("System", SystemSchema);

export default System;
