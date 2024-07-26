import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, get, child } from "firebase/database";

interface Club {
    clubLogo: string;
    title: string;
    description: string;
    president: string;

}

const Club = () => {
    const [clubData, setClubData] = useState<Club>();
    const clubName = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const navigate = useNavigate();

    useEffect(() => {
        const db = getDatabase();
        const dbRef = ref(db);
        get(child(dbRef, `/clubsData/${clubName}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setClubData(snapshot.val());
            }
        });
    }, [clubName]);

    console.log(clubData)

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6 w-screen md:w-[calc(100vw-207px)] h-[calc(100vh-56px)] ">
            {clubData ? (
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <img src={clubData.clubLogo} alt="Event Banner" className="w-full h-40 w-40 object-cover rounded-md mb-4" />
                    <h1 className="text-2xl font-bold mb-4">{clubData.title}</h1>
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
