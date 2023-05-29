import mongoose from "mongoose";

const identifierSchema = new mongoose.Schema(
  {
    sensor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sensors",
      default: null,
    },
    status: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: Number, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { timestamps: true }
);

const Identifier = mongoose.model("Identifier", identifierSchema);

export default Identifier;
