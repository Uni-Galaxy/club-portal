import { MdEventAvailable } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState, useRef } from "react";
import EventCards from "./EventCards";
import { FallingLines } from "react-loader-spinner";

interface Event {
    clubName: string;
    typeOfEvent: string;
    mainTitle: string;
    secondTitle: string;
    venue: string;
    eventDate: string;
    eventTime: string;
    id: string;
}

// id             String   @id @default(cuid()) // Unique identifier
//   banner         String
//   clubName       String
//   description    String
//   eventDate      String
//   eventDuration  String
//   eventTime      String
//   mainTitle      String
//   secondTitle    String
//   typeOfEvent    String
//   venue          String
//   createdAt      DateTime @default(now())
//   updatedAt      DateTime @updatedAt
//   club           Club?   @relation(fields: [clubId], references: [club_id])
//   clubId         Int?

const EventClouser = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoding, setIsLoding] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const data = async () => {
            setIsLoding(true)
            try {
                const token = localStorage.getItem('authToken');
                const headers: HeadersInit = {};
                if (token) {
                    headers['Authorization'] = token;
                }
                const url = `${import.meta.env.VITE_API_URL}/events`
                const response = await fetch(url, {
                    method: 'GET',
                    headers
                });
                const data = await response.json();
                setEvents(data)
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoding(false)
            }
        }

        data();
    }, []);


    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col pt-12 pb-12 border-b-[1px] border-[#e1e5ea] w-screen gap-8 md:w-[calc(100vw-207px)]">
            <div className="flex items-center justify-center gap-4 pr-12 pl-12">
                <div className="flex h-10 w-10 p-2 items-center justify-center rounded-lg border-[1px] border-[#e1e5ea]">
                    <MdEventAvailable size={24} />
                </div>
                <div className="flex flex-col items-start gap-2 grow-[1] pr-2">
                    <h2 className="text-base text-[#16191d] font-bold leading-5 tracking-[0.25px]">
                        Upcoming Event
                    </h2>
                    <p className="text-[#5b6271] leading-4 tracking-[0.4px]">
                        See what you want to do..
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

            {/* Loading State */}
            {isLoding ? (
                <div className="flex items-center justify-center">
                    <FallingLines color="#4fa94d" width="100" visible={true} />
                    <h1 className="">Loading Events</h1>
                </div>
            ) : (
                <div
                    className="flex gap-4 overflow-x-auto snap-x scroll-mandatory pr-12 pl-12 pb-3 scroll-smooth"
                    ref={scrollContainerRef}
                >
                    {events.length > 0 ? (
                        events.map((e) => (
                            <EventCards
                                key={e.id}
                                clubName={e.clubName}
                                typeOfEvent={e.typeOfEvent}
                                mainTitle={e.mainTitle}
                                secondTitle={e.secondTitle}
                                venue={e.venue}
                                eventDate={e.eventDate}
                                eventTime={e.eventTime}
                                _id={e.id}
                                value={e.id}
                            />
                        ))
                    ) : (
                        <h2>No events available</h2>
                    )}
                </div>
            )}
        </div>
    );
}

export default EventClouser;
