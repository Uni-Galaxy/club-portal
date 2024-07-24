import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { getDatabase, ref, get, child } from "firebase/database";
import { FaBuildingColumns } from "react-icons/fa6";
import ClubCards from "./ClubCards";

interface Club {
    clubLogo: string;
    description: string;
    title: string;
    president: string;
    key: string;
}


const ClubClouser = () => {
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
        <div className="flex flex-col pt-12 pb-12 border-b-[1px] border-[#e1e5ea] w-screen gap-8 md:w-[calc(100vw-207px)]" >
            <div className="flex items-center justify-center gap-4 pr-12 pl-12">
                <div className="flex h-10 w-10 p-2 items-center justify-center rounded-lg border-[1px] border-[#e1e5ea]">
                    <FaBuildingColumns size={24} />
                </div>
                <div className="flex flex-col items-start gap-2  grow-[1] pr-2">
                    <h2 className="text-base text-[#16191d] font-bold leading-5 tracking-[0.25px]">
                        Explore Clubs
                    </h2>
                    <p className="text-[#5b6271] leading-4 tracking-[0.4px]">
                        See what you can explore...
                    </p>
                </div>
                <div className="flex gap-2">
                    <div className="h-8 w-8 p-1 rounded-lg border-[1px] border-[#e1e5ea] cursor-pointer ease-linear flex items-center justify-center">
                        <IoIosArrowBack size={20} />
                    </div>
                    <div className="h-8 w-8 p-1 rounded-lg border-[1px] border-[#e1e5ea] cursor-pointer ease-linear flex items-center justify-center">
                        <IoIosArrowForward size={20} />
                    </div>
                </div>
            </div>
            <div className="flex gap-4 overflow-x-auto snap-[x mandatory] pr-12 pl-12 pb-3 scroll-smooth">
                {clubs.map((e) => {
                    return (
                        <ClubCards
                        description={e.description}
                        title={e.title}
                        key={e.key}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default ClubClouser
