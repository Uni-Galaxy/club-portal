import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const allEvents = async (req, res) => {
    try {
        // Fetch all events from the database
        const events = await prisma.event.findMany();
        // Send the fetched events data as the response
        res.json(events);
    } catch (error) {
        // Handle any errors that occur
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "An error occurred while fetching the events." });
    } finally {
        await prisma.$disconnect();  // Close the Prisma connection
    }
};
