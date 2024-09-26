import express from "express";
import { allUser, getUserById } from "../controllers/user.js";

const userRouters = express.Router();

userRouters.get("/",  allUser)
userRouters.get("/:id",  getUserById)

export default userRouters;