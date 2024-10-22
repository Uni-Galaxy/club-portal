import { allClubs, changeClubData, createClub, getClubById, getProfile, getClubMembers } from "../controllers/clubs.js";
import express from "express";

const clubsRouters = express.Router();

clubsRouters.get("/", allClubs);
clubsRouters.post("/", createClub)
clubsRouters.get("/profile", getProfile)
clubsRouters.get("/members", getClubMembers)
clubsRouters.post("/members", (req, res) => {
    res.send("doing")
})
clubsRouters.get("/:id", getClubById);
clubsRouters.patch("/", changeClubData)

export default clubsRouters;
