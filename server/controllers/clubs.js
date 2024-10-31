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

        if (!name || !club_email || !president || !president_email) {
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

// Use for /clubs/profile || give - club profile of club
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

// Use for /clubs || chnaging the club profile data 
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

// Use for /clubs/members || geting the list of all the members of the club
export const getClubMembers = async (req, res) => {
    const { google_id } = req.user;
    try {
        const { club_id } = await prisma.club.findUnique({
            where: { club_account_id: google_id }
        });

        const enrollments = await prisma.enrollment.findMany({
            where: {
                club_id: Number(club_id),
            },
            include: {
                user: {
                    select: {
                        google_id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                        profile_picture_url: true,
                    },
                },
            },
        });

        const clubMembers = enrollments.map(enrollment => enrollment.user);

        res.status(200).json({
            success: true,
            data: clubMembers,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong while fetching club members',
        });
    }
};

// 
export const addMembers = async (req, res) => {
    const { google_id } = req.user;
    try {
        const { club_id } = await prisma.club.findUnique({
            where: { club_account_id: google_id }
        });
        const list = req.body.userIds

        list.forEach(async (e) => {
            const enrollment = await prisma.enrollment.findMany({
                where: {
                    club_id: Number(club_id),
                    google_id: e
                }
            })

            if (enrollment.length === 0) {
                await prisma.enrollment.create({
                    data: {
                        club_id: Number(club_id),
                        google_id: e
                    }
                })
            }
        })

        res.status(200).json({ massage: "Member Added successfully" })

    } catch (error) {
        console.error("Error fetching club:", error.message);
        res.status(500).json({ error: "An error occurred while fetching the club.", message: error.message });
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteMember = async (req, res) => {
    try {
        const { google_id } = req.user;
        const { id } = req.params;
        const { club_id } = await prisma.club.findUnique({
            where: { club_account_id: google_id }
        });
        const enrollment = await prisma.enrollment.findMany({
            where: {
                club_id: Number(club_id),
                google_id: id
            }
        })

        if (enrollment) {
            await prisma.enrollment.delete({
                where: {
                    enrollment_id: enrollment[0].enrollment_id
                }
            })
            res.status(200).json({ massage: "Member deleted successfully" })
        } else {
            res.status(404).json({ massage: "Member not found" })
        }
    } catch (error) {
        console.error("Error deleting Member:", error.message);
        res.status(500).json({ error: "An error occurred while deleting Member.", message: error.message });
    } finally {
        await prisma.$disconnect();
    }
}