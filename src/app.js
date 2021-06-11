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
    const mario = await marioModel.findById(req.params.id);
    if (!mario) return res.status(400).send({ message: error.message });
    res.send(mario);
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

module.exports = app;
