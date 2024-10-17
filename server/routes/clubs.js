import { allClubs, changeClubData, createClub, getClubById, getProfile } from "../controllers/clubs.js";
import express from "express";

const clubsRouters = express.Router();

clubsRouters.get("/", allClubs);
clubsRouters.post("/", createClub)
clubsRouters.get("/profile", getProfile)
clubsRouters.get("/:id", getClubById);
clubsRouters.patch("/", changeClubData)

export default clubsRouters;
