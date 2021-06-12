const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const marioModel = require("./models/marioChar");

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// your code goes here
app.get("/mario", async (req, res) => {
    const mario = await marioModel.find();
    res.send(mario);
});

app.get("/mario/:id", async (req, res) => {
    try {
        const mario = await marioModel.findById(req.params.id);
        res.send(mario);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

app.post("/mario", async (req, res) => {
    const { name, weight } = req.body;
    if (!name || !weight) return res.status(400).send({ message: "either name or weight is missing" });
    let newMario = new marioModel({
        name: name,
        weight: weight,
    });
    const mario = await newMario.save();
    res.status(201).send(mario);
});

app.patch("/mario/:id", async (req, res) => {
    const { name, weight } = req.body;
    try {
        const mario = await marioModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name: name,
                    weight: weight,
                },
            },
            { new: true }
        );

        res.status(200).send(mario);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

app.delete("/mario/:id", async (req, res) => {
    try {
        const mario = await marioModel.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: "character deleted" });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

module.exports = app;
