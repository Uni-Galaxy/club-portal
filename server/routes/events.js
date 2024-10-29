import express from "express";
import { allEvents, createEvent, getEventById, changeEventData, deleteEvent, getClubEvent } from "../controllers/events.js";

const eventRouters = express.Router();

eventRouters.get("/", allEvents)
eventRouters.get("/club", getClubEvent)
eventRouters.get("/:id", getEventById)
eventRouters.post('/', createEvent);
eventRouters.patch("/:id", changeEventData);
eventRouters.delete("/:id", deleteEvent)


export default eventRouters;