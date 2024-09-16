import Strategy from "passport-google-oauth20";
import { Passport } from "passport";

Passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        (accessToken, refreshToken, profile, cb) => {
            return cb(null, profile);
        }
    )
)