import { Router } from "express";
import passport from "passport";
import { googleAuthCallbackHandler } from "../controllers/googleAuthController.js";

const router = Router();

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));

router.get("/google/callback", passport.authenticate("google", { session: false }), googleAuthCallbackHandler);

export default router;
