import { useEffect, useState } from "react";
import { getDatabase, ref, get, child } from "firebase/database";
import ClubCards from "../components/ClubCards";

interface Club {
    clubLogo: string;
    description: string;
    title: string;
    president: string;
    key: string;
}

const Clubs = () => {
    const [clubs, setCluubs] = useState<Club[]>([]);

    useEffect(() => {
        const db = getDatabase();
        const dbRef = ref(db);
        get(child(dbRef, `/clubsData`)).then((snapshot) => {
            if (snapshot.exists()) {
                const fetchedClubs: Club[] = [];
                snapshot.forEach((childSnapshot) => {
                    var obj = childSnapshot.val();
                    obj['key'] = childSnapshot.key;
                    fetchedClubs.push(obj);
                });
                setCluubs(fetchedClubs);
            }
        })
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
                            description={e.description}
                            title={e.title}
                            value={e.key}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Clubs
