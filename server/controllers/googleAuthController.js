import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Handle the callback after Google OAuth login
export const googleAuthCallback = (req, res) => {
    res.redirect("/auth/dashboard");
};

// Dashboard route (ensure user is authenticated)
export const googleDashboard = (req, res) => {
    if (!req.user) {
        return res.redirect("/");
    }
    res.send(`<h1>Hello, ${req.user.displayName}</h1>`);
};

// Logout and clear session
export const googleLogout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};

export const googleAuthCallbackHandler = async (req, res) => {

    const userData = {
        google_id: req.user._json.sub,
        email: req.user._json.email,
        first_name: req.user._json.given_name,
        last_name: req.user._json.family_name,
        profile_picture_url: req.user._json.picture
    };

    try {
        // Check if user already exists in the database
        let user = await prisma.user.findUnique({
            where: { google_id: userData.google_id }
        });

        if (!user) {
            // If user doesn't exist, create a new one
            user = await prisma.user.create({
                data: userData
            });
        } else {
            // If user exists, you can optionally update their profile information
            user = await prisma.user.update({
                where: { google_id: userData.google_id },
                data: {
                    ...userData,
                    lastlogin_at: new Date(), 
                }
            });
        }

        // Generate JWT token
        const tokenPayload = {
            google_id: user.google_id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1y" });

        // Send token back to the client (you can send it as a cookie or in the response body)
        res.json({ token });
    } catch (err) {
        console.error("Error saving user data to the database: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}