import mongoose from "mongoose";

//P Pond                - id of the water pond
//T TRIGGER             - main problem
//p parameter           - subproblem
//t type                - more info on subproblem
//I indicator           - type of parameter
//v value               - value of parameter
//S status              - todo/in progress/done

// Is address optional?
// Should we save all types of  problems and sub problems?
// Where do we get the data? (where does the problem come from)
// Where do we get the parameter ranges? (standard for water values, acidity, etc. )
// How do we ensure that indicators are valid for the problem? (pH is irrelevant to Cyber)

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
