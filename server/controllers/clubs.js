import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Use for /clubs || give - all the clubs from db 
export const allClubs = async (req, res) => {
    try {
        const clubs = await prisma.club.findMany();
        res.status(200).json(clubs);
    } catch (error) {
        console.error("Error fetching clubs:", error);
        res.status(500).json({ error: "An error occurred while fetching the clubs." });
    } finally {
        await prisma.$disconnect();
    }
};

// Use for /clubs/:id || give - one club from db
export const getClubById = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid club ID" });
        }

        const club = await prisma.club.findUnique({
            where: { club_id: parseInt(id) }
        });

        if (!club) {
            return res.status(404).json({ error: "Club not found" });
        }

        res.status(200).json(club);
    } catch (error) {
        console.error("Error fetching club:", error.message);
        res.status(500).json({ error: "An error occurred while fetching the club." });
    } finally {
        await prisma.$disconnect();
    }
};

// Use for /clubs || create - new club in db
export const createClub = async (req, res) => {
    try {
        const {
            name,
            description,
            logo_url,
            club_email,
            president,
            president_email,
            president_phone,
            membership_form_url,
            accepting_members,
            website_url
        } = req.body;

        if (!name || !club_email || !president || !president_email || !president_phone) {
            return res.status(400).json({ error: "Required fields are missing" });
        }

        const existingClub = await prisma.club.findFirst({
            where: {
                OR: [
                    { name },
                    { club_email }
                ]
            }
        });

        if (existingClub) {
            return res.status(409).json({ error: "Club with this name or email already exists." });
        }

        const newClub = await prisma.club.create({
            data: {
                name,
                description,
                logo_url,
                club_email,
                president,
                president_email,
                president_phone,
                membership_form_url,
                accepting_members: accepting_members ?? true,
                website_url
            }
        });

        res.status(201).json(newClub);

    } catch (error) {
        console.error("Error creating club:", error.message);
        res.status(500).json({ error: "An error occurred while creating the club." });
    } finally {
        await prisma.$disconnect();
    }
};

export const getProfile = async (req, res) => {
    try {
        const { google_id } = req.user;

        if (isNaN(google_id)) {
            return res.status(400).json({ error: "Invalid club ID" });
        }

        const club = await prisma.club.findUnique({
            where: { club_account_id: google_id }
        });

        if (!club) {
            return res.status(404).json({ error: "Club not found" });
        }

        res.status(200).json(club);
    } catch (error) {
        console.error("Error fetching club:", error.message);
        res.status(500).json({ error: "An error occurred while fetching the club." });
    } finally {
        await prisma.$disconnect();
    }
};

export const changeClubData = async (req, res) => {
    const { club_id } = req.body
    try {
        const club = await prisma.club.findUnique({
            where: { club_id: club_id }
        });

        if (!club) {
            return res.status(404).json({ error: "Club not found" });
        }

        if (req.body.accepting_members === "false") {
            req.body.accepting_members = false
        } else {
            req.body.accepting_members = true
        }

        const updatesClub = await prisma.club.update({
            where: {
                club_id: club_id
            },
            data: req.body
        })

        res.status(200).json({ massage: "Club Info Modify successfully", data: updatesClub })

    } catch (error) {
        console.error("Error fetching club:", error.message);
        res.status(500).json({ error: "An error occurred while fetching the club.", message: error.message });
    } finally {
        await prisma.$disconnect();
    }
}