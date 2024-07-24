import EventClouser from "../components/EventClouser"
import { useEffect, useState } from "react";
import { getDatabase, ref, get, child } from "firebase/database";
import EventCards from "../components/EventCards";

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

const Events = () => {
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
        <div className="w-screen md:w-[calc(100vw-207px)] h-[calc(100vh-56px)] flex flex-col  items-center p-4 ">
            <div className="w-full bg-[#f6f7f9] rounded-[6px] p-3">
                <h1 className="text-slate-700 text-3xl font-bold">Events</h1>
            </div>
            <div className=" flex p-3 gap-3 flex-wrap justify-center">
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
                    )
                })}
            </div>
        </div>
    )
}

export default Events
