// import { useEffect, useState } from "react";
// import { getDatabase, ref, get, child } from "firebase/database";

// interface Event {
//     clubName: string;
//     typeOfEvent: string;
//     mainTitle: string;
//     secondTitle: string;
//     venue: string;
//     eventDate: string;
//     eventTime: string;
//     _id: string;
//     key: string;
// }

// const Event = () => {
//     const [eventData, setEventData] = useState<Event>();
//     const eventName = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

//     useEffect(() => {
//         const db = getDatabase();
//         const dbRef = ref(db);
//         get(child(dbRef, `/event/displayEvent/${eventName}`)).then((snapshot) => {
//             if (snapshot.exists()) {
//                 setEventData(snapshot.val());
//             }
//         })
//     }, [])

//     console.log(eventData);

//     return (
//         <div>
//             <h1>Event</h1>
//         </div>
//     )
// }
// export default Event


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, get, child } from "firebase/database";

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
    description: string;
    banner: string;
    eventDuration: string;
}

const Event = () => {
    const [eventData, setEventData] = useState<Event>();
    const eventName = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const navigate = useNavigate();

    useEffect(() => {
        const db = getDatabase();
        const dbRef = ref(db);
        get(child(dbRef, `/event/displayEvent/${eventName}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setEventData(snapshot.val());
            }
        });
    }, [eventName]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6 w-screen md:w-[calc(100vw-207px)] h-[calc(100vh-56px)]">
            {eventData ? (
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <img src={eventData.banner} alt="Event Banner" className="w-full h-48 object-cover rounded-md mb-4" />
                    <h1 className="text-2xl font-bold mb-4">{eventData.mainTitle}</h1>
                    <h2 className="text-xl text-gray-600 mb-6">{eventData.secondTitle}</h2>
                    <p className="text-lg mb-2"><strong>Club:</strong> {eventData.clubName}</p>
                    <p className="text-lg mb-2"><strong>Type:</strong> {eventData.typeOfEvent}</p>
                    <p className="text-lg mb-2"><strong>Venue:</strong> {eventData.venue}</p>
                    <p className="text-lg mb-2"><strong>Date:</strong> {eventData.eventDate}</p>
                    <p className="text-lg mb-2"><strong>Time:</strong> {eventData.eventTime}</p>
                    <p className="text-lg mb-2"><strong>Duration:</strong> {eventData.eventDuration}</p>
                    <p className="text-lg mb-4"><strong>Description:</strong> {eventData.description}</p>
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

export default Event;
