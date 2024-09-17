import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const allClubs = async (req, res) => {
    try {
        // Fetch all clubs from the database
        const clubs = await prisma.club.findMany();
        // Send the fetched clubs data as the response
        res.json(clubs);
    } catch (error) {
        // Handle any errors that occur
        console.error("Error fetching clubs:", error);
        res.status(500).json({ error: "An error occurred while fetching the clubs." });
    } finally {
        await prisma.$disconnect();  // Close the Prisma connection
    }
};
