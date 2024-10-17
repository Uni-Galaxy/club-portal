import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Use for /events || give - all the events from db 
export const allEvents = async (req, res) => {
    try {
        const events = await prisma.event.findMany();
        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "An error occurred while fetching the events." });
    } finally {
        await prisma.$disconnect();
    }
};

// Use for /events/:id || get event by id
export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Invalid Event ID" });
        }

        const club = await prisma.event.findUnique({
            where: { id: (id) }
        });

        if (!club) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.status(200).json(club);
    } catch (error) {
        console.error("Error fetching event:", error.message);
        res.status(500).json({ error: "An error occurred while fetching the event." });
    } finally {
        await prisma.$disconnect();
    }
};

// Use for /events || create new event
export const createEvent = async (req, res) => {
    const token = req.headers['authorization']
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const { google_id } = user
    const { name, club_id } = await prisma.club.findUnique({
        where: { club_account_id: google_id }
    })

    console.log("req body", req.body)

    try {
        const { banner, description, eventDate, eventDuration, eventTime, mainTitle, secondTitle, typeOfEvent, venue } = req.body;

        if (!mainTitle || !name || !eventDate || !eventTime || !typeOfEvent) {
            return res.status(400).json({ error: "Required fields are missing" });
        }

        const existingEvent = await prisma.event.findFirst({
            where: {
                mainTitle,
                eventDate
            }
        });

        if (existingEvent) {
            return res.status(409).json({ error: "Event already exists with this title and date." });
        }

        const newEvent = await prisma.event.create({
            data: {
                banner,
                clubName: name,
                description,
                eventDate,
                eventDuration,
                eventTime,
                mainTitle,
                secondTitle,
                typeOfEvent,
                venue,
                clubId: club_id
            }
        });

        res.status(201).json(newEvent);
    } catch (error) {
        console.error("Error creating event:", error.message);
        res.status(500).json({ error: "An error occurred while creating the event." });
    } finally {
        await prisma.$disconnect();
    }
};

