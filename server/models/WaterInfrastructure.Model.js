import mongoose from "mongoose";

const WaterInfrastructureSchema = new mongoose.Schema(
  {
    // name of the infrastructure
    infrastructureName: {
      type: String,
      required: true,
    },
    // number of infrastructure
    infrastructureAttribute: {
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
    // status of infrastructure
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const WaterInfrastructure = mongoose.model(
  "WaterInfrastructure",
  WaterInfrastructureSchema
);

export default WaterInfrastructure;
