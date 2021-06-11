const mongoose = require("mongoose");

//  Your code goes here
const mariochar = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
});

const marioModel = mongoose.model("mariochar", mariochar);

module.exports = marioModel;
