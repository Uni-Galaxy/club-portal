import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import cors from 'cors';
import morgan from 'morgan';
import googleAuthRouter from "./routes/googleAuth.js";
import clubsRouters from "./routes/clubs.js";
import authenticateJWT from "./middleware/authMiddleware.js";
import "./config/passportConfig.js";
import eventRouters from "./routes/events.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Initialize Passport
app.use(passport.initialize());

// Routes
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Google Auth routes (JWT Token generation after Google sign-in)
app.use("/auth", googleAuthRouter);

// Protected route using JWT authentication middleware
app.get("/protected", authenticateJWT, (req, res) => {
    res.send(`Welcome ${req.user.name}, this is a protected route.`);
});

// Clubs Data routes
app.use("/clubs", clubsRouters);

//Events Data routes
app.use("/events", eventRouters)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
