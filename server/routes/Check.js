import express from "express";
import { checkAccess, checkStatus } from "../controllers/check.js";
import isAuthorize from "../middleware/authMiddleware.js";

const checkRouters = express.Router();

checkRouters.get("/",  checkStatus);
checkRouters.get("/access", isAuthorize, checkAccess)

export default checkRouters;