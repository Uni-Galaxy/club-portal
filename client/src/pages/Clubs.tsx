import { useEffect, useState } from "react";
import ClubCards from "../components/ClubCards";

interface Club {
    logo_url: string;
    description: string;
    name: string;
    president: string;
    club_id: string;
}

const Clubs = () => {
    const [clubs, setCluubs] = useState<Club[]>([]);

    useEffect(() => {
        const clubData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const headers: HeadersInit = {};
                if (token) {
                    headers['Authorization'] = token;
                }
                const url = `${import.meta.env.VITE_API_URL}/clubs`
                const response = await fetch(url, {
                    method: 'GET',
                    headers
                });
                const data = await response.json();
                setCluubs(data);

            } catch (err) {
                console.log(err);
            }
        }

        clubData()
    }, [])


    return (
        <div className="w-screen md:w-[calc(100vw-207px)] h-[calc(100vh-56px)] flex flex-col  items-center p-4 ">
            <div className="w-full bg-[#f6f7f9] rounded-[6px] p-3">
                <h1 className="text-slate-700 text-3xl font-bold">Clubs</h1>
            </div>
            <div className=" flex p-3 gap-3 flex-wrap justify-center">
                {clubs.map((e) => {
                    return (
                        <ClubCards
                            key={e.club_id}
                            description={e.description}
                            title={e.name}
                            value={e.club_id}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Clubs
