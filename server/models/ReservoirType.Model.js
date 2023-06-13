import mongoose from "mongoose";

const ReservoirTypeSchema = new mongoose.Schema(
  {
    reservoirId: {
      type: String,
      required: true,
    },
    reservoirTypeName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const InfraType = mongoose.model("ReservoirType", ReservoirTypeSchema);

export default InfraType;
