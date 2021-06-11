const mongoose = require("mongoose");
const Joi = require("joi");

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

function validateMario(mario) {
    const schema = Joi.object({
        name: Joi.string().required(),
        weight: Joi.number().required(),
    });

    return schema.validate(mario);
}

module.exports.marioModel = marioModel;
module.exports.validateMario = validateMario;
