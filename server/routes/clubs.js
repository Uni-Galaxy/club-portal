import { allClubs } from "../controllers/clubs.js";
import express from "express";

const clubsRouters = express.Router();

clubsRouters.get("/", allClubs);

export default clubsRouters;
