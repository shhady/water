import mongoose from "mongoose";

const DataArraySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const DataArray = mongoose.model("DataArray", DataArraySchema);

export default DataArray;
