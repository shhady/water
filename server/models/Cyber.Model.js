import mongoose from "mongoose";

//P Pond                - id of the water pond
//T TRIGGER             - main problem
//p parameter           - subproblem
//t type                - more info on subproblem
//I indicator           - type of parameter
//v value               - value of parameter
//S status              - todo/in progress/done
//m message
const cyberSchema = new mongoose.Schema(
    {
        S: {
            type: Number,
            required: true,
        },
        P: {
            type: Number,
            required: true,
        },
        T: {
            type: String,
            required: true,
        },
        v: {
            type: String,
            required: true,
        },
        m:{
            type:String,
            required:true
        }
        
    },
    { timestamps: true }
);

const Cyber = mongoose.model("Cyber", cyberSchema);

export default Cyber;