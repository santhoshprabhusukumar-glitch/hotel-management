require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Error:", err));

const Room = mongoose.model("Room", {
    roomId: Number,
    roomNumber: Number,
    roomType: String,
    price: Number,
    floor: Number,
    availability: Boolean
});

app.get("/", (req, res) => {
    res.send("Hotel Management Server Running");
});

app.get("/rooms", async (req, res) => {
    const rooms = await Room.find({ availability: true });
    res.json(rooms);
});

app.put("/rooms/:id", async (req, res) => {
    const room = await Room.findOneAndUpdate(
        { roomId: req.params.id },
        { availability: req.body.availability },
        { new: true }
    );

    res.json(room);
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});