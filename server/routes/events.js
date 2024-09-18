import express from "express";
import { allEvents, createEvent, getEventById } from "../controllers/events.js";

const eventRouters = express.Router();

eventRouters.get("/", allEvents)
eventRouters.get("/:id", getEventById)
eventRouters.post('/', createEvent);


export default eventRouters;