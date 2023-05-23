import mongoose from "mongoose";

const ConnectionSchema = new mongoose.Schema(
  {
    meaning: {
      type: String,
      required: true,
    },
    activity: {
      type: Number,
      required: true,
    },
    parameters: [
      {
        trigger: {
          type: Number,
          required: true,
        },
        value: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Connection = mongoose.model("Connection", ConnectionSchema);

export default Connection;
