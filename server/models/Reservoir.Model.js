import mongoose from "mongoose";

const ReservoirSchema = new mongoose.Schema(
  {
    // name of the Reservoir
    reservoirName: {
      type: String,
      required: true,
    },
    // number of Reservoir
    reservoirAttribute: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    streetNumber: {
      type: Number,
      required: true,
    },
    // status of Reservoir
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Reservoir = mongoose.model("Reservoir", ReservoirSchema);

export default Reservoir;
