import jwt from "jsonwebtoken";

const isAuthorize = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No Token Provided!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid Token" });
        }

        req.user = user;  
        next();
    });
};

export default isAuthorize;
