import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export const checkAccess = async (req, res) => {
    try {
        const token = req.headers['authorization']

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure to have JWT_SECRET in your env

        // Extract google_id from the decoded token
        const { google_id } = decoded;

        if (!google_id) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        // Query the database for the user with the extracted google_id
        const user = await prisma.user.findUnique({
            where: { google_id }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Extract and return the role
        return res.status(200).json({
            role: user.role,
            message: 'Access granted',
        });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to authenticate token', error: error.message });
    }
};
