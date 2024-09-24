import jwt from "jsonwebtoken";

export const checkStatus = async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ message: 'Token is valid', decoded });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};