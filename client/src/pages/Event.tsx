import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

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
    const [eventData, setEventData] = useState<Event | null>(null);
    const eventName = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const headers: HeadersInit = {};
                if (token) {
                    headers['Authorization'] = token;
                }
                const url = `${import.meta.env.VITE_API_URL}/events/${eventName}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers,
                });
                const data = await response.json();
                setEventData(data);
            } catch (err) {
                console.error("Failed to fetch event data:", err);
            }
        };
        fetchData();
    }, [eventName]);

    return (
        <div className="flex justify-center items-center h-[calc(100vh-56px)] bg-gray-50 p-4 md:p-6 w-screen md:w-[calc(100vw-207px)]">
            {eventData ? (
                <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-lg w-full space-y-6">
                    <img
                        src={eventData.banner}
                        alt="Event Banner"
                        className="w-full h-60 md:h-80 object-cover rounded-lg mb-4"
                    />
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-gray-800">{eventData.mainTitle}</h1>
                        <h2 className="text-lg text-gray-500">{eventData.secondTitle}</h2>
                    </div>
                    <div className="text-gray-700 space-y-4">
                        <p className="flex items-center text-lg">
                            <FaUsers className="text-blue-500 mr-2" />
                            <strong>Club:</strong> {eventData.clubName}
                        </p>
                        <p className="flex items-center text-lg">
                            <FaCalendarAlt className="text-green-500 mr-2" />
                            <strong>Date:</strong> {eventData.eventDate}
                        </p>
                        <p className="flex items-center text-lg">
                            <FaClock className="text-yellow-500 mr-2" />
                            <strong>Time:</strong> {eventData.eventTime} | {eventData.eventDuration}
                        </p>
                        <p className="flex items-center text-lg">
                            <FaMapMarkerAlt className="text-red-500 mr-2" />
                            <strong>Venue:</strong> {eventData.venue}
                        </p>
                        <p className="text-lg">
                            <strong>Description:</strong> {eventData.description}
                        </p>
                    </div>
                    <button
                        onClick={() => navigate(`/`)}
                        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Go Home
                    </button>
                </div>
            ) : (
                <p className="text-xl font-medium text-gray-600">Loading event data...</p>
            )}
        </div>
    );
};

export default Event;
