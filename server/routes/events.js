import express from "express";
import { allEvents, createEvent, getEventById } from "../controllers/events.js";
import isAuthorize from "../middleware/authMiddleware.js";

const eventRouters = express.Router();

eventRouters.get("/", isAuthorize, allEvents)
eventRouters.get("/:id", isAuthorize, getEventById)
eventRouters.post('/', isAuthorize, createEvent);


export default eventRouters;