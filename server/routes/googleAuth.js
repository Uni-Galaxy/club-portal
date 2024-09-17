import { Router } from "express";
import passport from "passport";
import { googleAuthCallbackHandler } from "../controllers/googleAuthController.js";

const router = Router();

// Route to initiate Google authentication
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));

// Callback route that Google redirects to after authentication
router.get("/google/callback", passport.authenticate("google", { session: false }), googleAuthCallbackHandler);

export default router;
