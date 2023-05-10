import mongoose from "mongoose";

const identifierSchema = new mongoose.Schema(
  {
    identifierId: { type: String, required: true },
    additionalIdentifier: { type: String, required: true, unique: true },
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
