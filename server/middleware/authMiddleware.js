import jwt from "jsonwebtoken";

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];  // Get token from the Authorization header

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No Token Provided!" });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid Token" });
        }

        req.user = user;  
        next();
    });
};

export default authenticateJWT;
