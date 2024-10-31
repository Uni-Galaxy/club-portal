import { allClubs, changeClubData, createClub, getClubById, getProfile, getClubMembers, addMembers, deleteMember } from "../controllers/clubs.js";
import express from "express";

const clubsRouters = express.Router();

clubsRouters.get("/", allClubs);
clubsRouters.post("/", createClub)
clubsRouters.get("/profile", getProfile)
clubsRouters.get("/members", getClubMembers)
clubsRouters.post("/members", addMembers)
clubsRouters.delete("/members/:id", deleteMember)
clubsRouters.get("/:id", getClubById);
clubsRouters.patch("/", changeClubData)

export default clubsRouters;
