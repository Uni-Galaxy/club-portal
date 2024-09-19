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
import userRouters from "./routes/user.js";

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

// Routes
app.use("/auth", googleAuthRouter);
app.use("/clubs", clubsRouters);
app.use("/events", eventRouters);
app.use("/users", userRouters)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
