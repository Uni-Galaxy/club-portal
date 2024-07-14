import { MdEventAvailable } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { getDatabase, ref, get, child } from "firebase/database";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";
import { Link } from "react-router-dom";

interface Event {
    clubName: string;
    typeOfEvent: string;
    mainTitle: string;
    secondTitle: string;
    venue: string;
    eventDate: string;
    eventTime: string;
    _id: string;
    key: string;
}


const EventClouser = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const db = getDatabase();
        const dbRef = ref(db);
        get(child(dbRef, `/event/displayEvent`)).then((snapshot) => {
            if (snapshot.exists()) {
                const fetchedEvents: Event[] = [];
                snapshot.forEach((childSnapshot) => {
                    var obj = childSnapshot.val();
                    obj['key'] = childSnapshot.key;
                    fetchedEvents.push(obj);
                });
                setEvents(fetchedEvents);
            }
        })
    }, [])

    return (
        <div className="flex flex-col pt-12 pb-12 border-b-[1px] border-[#e1e5ea] w-screen gap-8 md:w-[calc(100vw-207px)]" >
            <div className="flex items-center justify-center gap-4 pr-12 pl-12">
                <div className="flex h-10 w-10 p-2 items-center justify-center rounded-lg border-[1px] border-[#e1e5ea]">
                    <MdEventAvailable size={24} />
                </div>
                <div className="flex flex-col items-start gap-2  grow-[1] pr-2">
                    <h2 className="text-base text-[#16191d] font-bold leading-5 tracking-[0.25px]">
                        Upcoming Event
                    </h2>
                    <p className="text-[#5b6271] leading-4 tracking-[0.4px]">
                        See want you want to do..
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
                {events.map((e) => {
                    return (
                        <div className="flex flex-col min-w-[280px] p-1 justify-center items-end rounded-2xl border border-[#e1e5ea] relative bg-[#f6f7f9] " key={e._id}>
                            <div className="flex flex-col w-full grow ">
                                <div className="flex items-center gap-2 p-3 px-4 rounded-t-xl border border-[#e1e5ea] bg-[#fff] text-[#16191d] text-xs leading-[120%] tracking-wide font-medium cursor-pointer">
                                    {e.clubName}
                                </div>
                                <div className="flex flex-col items-start justify-center gap-[8px] p-[16px] pb-[24px] rounded-bl-[12px] rounded-br-[12px] border-l border-r border-b border-[#e1e5ea] bg-[#fff] flex-grow cursor-pointer">
                                    <div className="flex items-center gap-[8px]">
                                        <div className="flex items-center gap-[4px] p-[4px] rounded-[6px] border border-[#ffd580] bg-[#fff3d6]">
                                            <img src="https://d3dyfaf3iutrxo.cloudfront.net/general/upload/692729ccc85d4792a3717df53cb99793-note-1.svg" />
                                        </div>
                                        <div className="text-[#16191d] text-[12px] leading-[120%] tracking-[0.4px] font-[550]">
                                            {e.typeOfEvent}
                                        </div>
                                    </div>
                                    <div className="text-[#16191d] text-[16px] leading-[160%] tracking-[0.1px] font-[550] overflow-hidden flex-grow line-clamp-2">
                                        {e.mainTitle}
                                    </div>
                                    <div className="text-[#5b6271] text-[12px] leading-[120%] tracking-[0.4px] font-[450] ">
                                        {e.secondTitle}
                                    </div>
                                    <div className="text-[#454950] text-[12px] leading-[120%] tracking-[0.4px] font-[450] flex gap-1">
                                        <CiLocationOn /> Venue: {e.venue}
                                    </div>
                                    <div className="text-[#454950] text-[12px] leading-[120%] tracking-[0.4px] font-[450] flex gap-1">
                                        <CiCalendarDate /> Date: {e.eventDate}
                                    </div>
                                    <div className="text-[#454950] text-[12px] leading-[120%] tracking-[0.4px] font-[450] flex gap-1">
                                        <CiTimer /> Time: {e.eventTime}
                                    </div>
                                </div>
                                <div className="flex items-center justify-center p-3 px-[16px]">
                                    <Link to={`event/${e.key}`} className="flex items-center justify-center w-[120px] h-[40px] min-h-[40px] p-[8px] px-[12px] rounded-[8px] bg-[#0b0c0e] text-[#fff] text-[14px] leading-[160%] tracking-[0.4px] font-[550] cursor-pointer hover:shadow-xl">
                                        Join
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default EventClouser
