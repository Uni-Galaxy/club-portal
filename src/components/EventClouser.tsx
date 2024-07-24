import { MdEventAvailable } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState, useRef } from "react";
import { getDatabase, ref, get, child } from "firebase/database";
import EventCards from "./EventCards";

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
    const scrollContainerRef = useRef<HTMLDivElement>(null);

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
                        className="h-8 w-8 p-1 rounded-lg border-[1px] border-[#e1e5ea] cursor-pointer ease-linear flex items-center justify-center"
                        onClick={scrollLeft}
                    >
                        <IoIosArrowBack size={20} />
                    </div>
                    <div
                        className="h-8 w-8 p-1 rounded-lg border-[1px] border-[#e1e5ea] cursor-pointer ease-linear flex items-center justify-center"
                        onClick={scrollRight}
                    >
                        <IoIosArrowForward size={20} />
                    </div>
                </div>
            </div>
            <div
                className="flex gap-4 overflow-x-auto snap-x scroll-mandatory pr-12 pl-12 pb-3 scroll-smooth"
                ref={scrollContainerRef}
            >
                {events.map((e) => {
                    return (
                        <EventCards
                            clubName={e.clubName}
                            typeOfEvent={e.typeOfEvent}
                            mainTitle={e.mainTitle}
                            secondTitle={e.secondTitle}
                            venue={e.venue}
                            eventDate={e.eventDate}
                            eventTime={e.eventTime}
                            _id={e._id}
                            key={e.key}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default EventClouser;
