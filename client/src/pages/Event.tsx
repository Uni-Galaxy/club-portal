import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        const data = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const headers: HeadersInit = {};
                if (token) {
                    headers['Authorization'] = token;
                }
                const url = `${import.meta.env.VITE_API_URL}/events/${eventName}`
                const response = await fetch(url, {
                    method: 'GET',
                    headers
                });
                const data = await response.json();
                setEventData(data)

            } catch (err) {
                console.log(err);
            }
        }
        data();
    }, [eventName])

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6 w-screen md:w-[calc(100vw-207px)] h-[calc(100vh-56px)] ">
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
