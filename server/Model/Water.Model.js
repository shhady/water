import mongoose from 'mongoose';

//P Pond
//T TRIGER
//p parameter
//t type
//v value
//I indicator
const waterSchema = new mongoose.Schema({
    P: {
        type: String,
        required: true
    },
    T: {
        type: String,
        required: true,
    },
    p: {
        type: String,
        required: true
    },
    t: {
        type: String,
        required: true,
    },
    v: {
        type: Number,
        required: true,
    },
    I:{
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true,
    }
},{timestamps : true});

const Water = mongoose.model('Water', waterSchema);

module.exports = Water;
