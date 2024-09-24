import express from "express";
import { checkStatus } from "../controllers/check.js";
import isAuthorize from "../middleware/authMiddleware.js";

const checkRouters = express.Router();

checkRouters.get("/", isAuthorize, checkStatus);

export default checkRouters;