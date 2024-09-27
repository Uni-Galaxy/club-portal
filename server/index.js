import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import cors from 'cors';
import morgan from 'morgan';
import googleAuthRouter from "./routes/googleAuth.js";
import clubsRouters from "./routes/clubs.js";
import "./config/passportConfig.js";
import eventRouters from "./routes/events.js";
import userRouters from "./routes/user.js";
import checkRouters from "./routes/Check.js";
import isAuthorize from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());

//Developemnent
app.use(cors({
    origin: 'http://localhost:5173',  // Frontend URL
    credentials: true  // Allow cookies and other credentials
}));

// Production
// app.use(cors({
//     origin: 'https://club.yashlunawat.com',  // Frontend URL
//     credentials: true  // Allow cookies and other credentials
// }));

app.use(morgan('dev'));

// Initialize Passport
app.use(passport.initialize());

// Routes
app.get("/api", (req, res) => {
    res.send("Hello World");
});

// Routes
app.use("/auth", googleAuthRouter);
app.use("/api/clubs", isAuthorize, clubsRouters);
app.use("/api/events", isAuthorize, eventRouters);
app.use("/api/users", isAuthorize, userRouters);
app.use("/api/check", checkRouters);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
