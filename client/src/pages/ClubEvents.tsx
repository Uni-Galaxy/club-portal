import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import ClubEventCard from "../components/ClubsEventCard";
import { useNavigate } from "react-router-dom";

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

const ClubEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const data = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const headers: HeadersInit = {};
                if (token) {
                    headers['Authorization'] = token;
                }
                const url = `${import.meta.env.VITE_API_URL}/events/club`
                const response = await fetch(url, {
                    method: 'GET',
                    headers
                });
                const data = await response.json();
                setEvents(data)
                setLoading(false)

            } catch (err) {
                console.log(err);
                setLoading(false)
            }
        }

        data();
    }, []);


    return (
        <div className="w-screen md:w-[calc(100vw-207px)] h-[calc(100vh-56px)] flex flex-col p-6 ">
            <div className="w-full bg-[#f6f7f9] rounded-[6px] p-3">
                <h1 className="text-slate-700 text-3xl font-bold">Manage Events</h1>
            </div>
            <button
                className="bg-blue-500 text-white px-6 py-2 my-6 rounded-lg hover:bg-blue-600 transition duration-200 self-start"
                onClick={() => navigate('/creatingEvent')}
            >
                Create a new Event
            </button>

            <h2 className="text-2xl font-semibold self-start">Current Events</h2>
            <div className="flex p-3 gap-3 flex-wrap justify-center">
                {loading ? (
                    <div className="flex items-center justify-center">
                        <FallingLines color="#4fa94d" width="100" visible={true} />
                        <h1>Loading Events</h1>
                    </div>
                ) : (
                    events.length > 0 ? (
                        events.map((e) => (
                            <ClubEventCard
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
                    )
                )}
            </div>
        </div>
    )
}

export default ClubEvents;
