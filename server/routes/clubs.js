import { allClubs, createClub, getClubById } from "../controllers/clubs.js";
import express from "express";

const clubsRouters = express.Router();

clubsRouters.get("/", allClubs);
clubsRouters.get("/:id", getClubById);
clubsRouters.post("/", createClub)

export default clubsRouters;
