import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const allUser = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "An error occurred while fetching the users." });
    } finally {
        await prisma.$disconnect();
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid User ID" });
        }

        const user = await prisma.user.findUnique({
            where: { google_id: id }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error.message);
        res.status(500).json({ error: "An error occurred while fetching the user." });
    } finally {
        await prisma.$disconnect();
    }
};

export const checkStatus = (req, res) => {
    const token = req.headers['authorization'];
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    try {
        console.log(process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ message: 'Token is valid', decoded });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};
