import { allClubs, createClub, getClubById } from "../controllers/clubs.js";
import express from "express";
import isAuthorize from "../middleware/authMiddleware.js";

const clubsRouters = express.Router();

clubsRouters.get("/", isAuthorize, allClubs);
clubsRouters.get("/:id",isAuthorize, getClubById);
clubsRouters.post("/",isAuthorize, createClub)

export default clubsRouters;
