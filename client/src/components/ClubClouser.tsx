import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState, useRef } from "react";
import { FaBuildingColumns } from "react-icons/fa6";
import ClubCards from "./ClubCards";
import { FallingLines } from "react-loader-spinner";

interface Club {
    logo_url: string;
    description: string;
    name: string;
    president: string;
    club_id: string;
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

const ClubClouser = () => {
    const [clubs, setClubs] = useState<Club[]>([]);
    const [isLoding, setIsLoding] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clubData = async () => {
            setIsLoding(true)
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
                setClubs(data);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoding(false);
            }
        }

        clubData();
    }, [])

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col pt-12 pb-12 border-b-[1px] border-[#e1e5ea] w-screen gap-8 md:w-[calc(100vw-207px)]">
            <div className="flex items-center justify-center gap-4 pr-12 pl-12">
                <div className="flex h-10 w-10 p-2 items-center justify-center rounded-lg border-[1px] border-[#e1e5ea]">
                    <FaBuildingColumns size={24} />
                </div>
                <div className="flex flex-col items-start gap-2 grow-[1] pr-2">
                    <h2 className="text-base text-[#16191d] font-bold leading-5 tracking-[0.25px]">
                        Explore Clubs
                    </h2>
                    <p className="text-[#5b6271] leading-4 tracking-[0.4px]">
                        See what you can explore...
                    </p>
                </div>
                <div className="flex gap-2">
                    <div
                        className="h-8 w-8 p-1 rounded-lg border-[1px] border-[#e1e5ea] cursor-pointer ease-linear flex items-center justify-center hover:bg-[#F0F2F4]"
                        onClick={scrollLeft}
                    >
                        <IoIosArrowBack size={20} />
                    </div>
                    <div
                        className="h-8 w-8 p-1 rounded-lg border-[1px] border-[#e1e5ea] cursor-pointer ease-linear flex items-center justify-center hover:bg-[#F0F2F4]"
                        onClick={scrollRight}
                    >
                        <IoIosArrowForward size={20} />
                    </div>
                </div>
            </div>
            {isLoding ? (
                <div className="flex items-center justify-center">
                    <FallingLines
                        color="#4fa94d"
                        width="100"
                        visible={true}
                    />
                    <h1 className="">Loding clubs </h1>
                </div>
            ) : (
                <div
                    className="flex gap-4 overflow-x-auto snap-x scroll-mandatory pr-12 pl-12 pb-3 scroll-smooth"
                    ref={scrollContainerRef}
                >
                    {clubs.map((e) => {
                        return (
                            <ClubCards
                                key={e.club_id}
                                description={e.description}
                                title={e.name}
                                value={e.club_id}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    )
};

export default ClubClouser;
