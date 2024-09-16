import express from "express";

const eventRouters = express.Router();

eventRouters.get("/", (req, res) => {
    res.send("Event Router");
})

export default eventRouters;