import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Logout and clear session
export const googleLogout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};

// storing user in database and sending them 
export const googleAuthCallbackHandler = async (req, res) => {
    const userData = {
        google_id: req.user._json.sub,
        email: req.user._json.email,
        first_name: req.user._json.given_name,
        last_name: req.user._json.family_name,
        profile_picture_url: req.user._json.picture
    };

    try {
        let user = await prisma.user.findUnique({
            where: { google_id: userData.google_id }
        });

        if (!user) {
            user = await prisma.user.create({
                data: userData
            });
        } else {
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

        // Redirect user to frontend with the token
        // const frontendRedirectUrl = `http://localhost:5173/signin?token=${token}`; //Developement
        const frontendRedirectUrl = `https://club.yashlunawat.com/signin?token=${token}`; //Production
        res.redirect(frontendRedirectUrl);

    } catch (err) {
        console.error("Error saving user data to the database: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
