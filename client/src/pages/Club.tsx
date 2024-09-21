import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Club {
    logo_url: string;
    name: string;
    description: string;
    president: string;
}

// model Club {
    //     club_id             Int      @id @default(autoincrement())
    //     name                String
    //     description         String?
    //     logo_url            String?
    //     club_email          String
    //     president           String
    //     president_email     String
    //     president_phone     String
    //     membership_form_url String?
    //     accepting_members   Boolean  @default(true)
    //     website_url         String?
    //     created_at          DateTime @default(now())
    //     updated_at          DateTime @default(now()) @updatedAt
    //     events              Event[]
    //     club_account_id     String   @unique // Links to User google_id
    //     clubAccount         User     @relation(fields: [club_account_id], references: [google_id], name: "UserClubRelation") // Correct relation to User model
    //   }

const Club = () => {
    const [clubData, setClubData] = useState<Club>();
    const clubName = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const db = getDatabase();
    //     const dbRef = ref(db);
    //     get(child(dbRef, `/clubsData/${clubName}`)).then((snapshot) => {
    //         if (snapshot.exists()) {
    //             setClubData(snapshot.val());
    //         }
    //     });
    // }, [clubName]);

    useEffect(() => {
        const clubData = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/clubs/${clubName}`
                const response = await fetch(url);
                const data = await response.json();
                setClubData(data);

            } catch (err) {
                console.log(err);
            }
        }

        clubData()
    }, [clubName])

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6 w-screen md:w-[calc(100vw-207px)] h-[calc(100vh-56px)] ">
            {clubData ? (
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <img src={clubData.logo_url} alt="Event Banner" className="w-full h-40 w-40 object-cover rounded-md mb-4" />
                    <h1 className="text-2xl font-bold mb-4">{clubData.name}</h1>
                    <p className="text-lg mb-4"><strong>Description:</strong> {clubData.description}</p>
                    <p className="text-lg mb-2"><strong>President of Club:</strong> {clubData.president}</p>
                    <button
                        onClick={() => navigate(`/`)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Go Home
                    </button>
                </div>
            ) : (
                <p>Loading event data...</p>
            )}
        </div>
    );
};

export default Club;
