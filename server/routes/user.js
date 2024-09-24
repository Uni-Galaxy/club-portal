import express from "express";
import { allUser, getUserById } from "../controllers/user.js";
import isAuthorize from "../middleware/authMiddleware.js";

const userRouters = express.Router();

userRouters.get("/", isAuthorize, allUser)
userRouters.get("/:id", isAuthorize, getUserById)

export default userRouters;