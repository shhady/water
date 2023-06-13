import mongoose from "mongoose";

const InfraTypeSchema = new mongoose.Schema(
  {
    infraTypeName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const InfraType = mongoose.model("InfraType", InfraTypeSchema);

export default InfraType;
