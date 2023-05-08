import mongoose from "mongoose";

//P Pond
//T TRIGER
//p parameter
//t type
//v value
//I indicator
//S status

const waterSchema = new mongoose.Schema(
  {
    S: {
      type: Number,
      required: true,
      default: 1,
    },
    P: {
      type: String,
      required: true,
    },
    T: {
      type: String,
      required: true,
    },
    p: {
      type: String,
      required: true,
    },

    t: {
      type: String,
      required: true,
    },
    v: {
      type: Number,
      required: true,
    },
    I: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    number: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Water = mongoose.model("Water", waterSchema);

export default Water;
