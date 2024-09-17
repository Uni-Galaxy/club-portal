import express from "express";
import { allEvents } from "../controllers/events.js";

const eventRouters = express.Router();

eventRouters.get("/", allEvents)

export default eventRouters;