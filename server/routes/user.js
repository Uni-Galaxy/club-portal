import express from "express";
import { allUser, checkStatus, getUserById } from "../controllers/user.js";

const userRouters = express.Router();

userRouters.get("/", allUser)
userRouters.get("/:id", getUserById)
userRouters.get("/check", checkStatus)

export default userRouters;