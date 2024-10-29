import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

interface Event {
    clubName: string;
    typeOfEvent: string;
    mainTitle: string;
    secondTitle: string;
    venue: string;
    eventDate: string;
    eventTime: string;
    id: string;
    description: string;
    banner: string;
    eventDuration: string;
    updatedAt:string;
    createdAt:string;
}

const EditClubEvent = () => {
    const [eventData, setEventData] = useState<Event>();
    const EvwntId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const navigate = useNavigate()

    useEffect(() => {
        const data = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const headers: HeadersInit = {};
                if (token) {
                    headers['Authorization'] = token;
                }
                const url = `${import.meta.env.VITE_API_URL}/events/${EvwntId}`
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
    }, []);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        // @ts-ignore
        setEventData({
            ...eventData,
            [name]: value
        });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('authToken');
            const headers: HeadersInit = {};
            if (token) {
                headers['Authorization'] = token;
                headers['Content-Type'] = "application/json";
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventData?.id}`, {
                method: "PATCH",
                headers,
                body: JSON.stringify(eventData)
            });

            if (response.ok) {
                console.log(response.ok)
                toast.success("Event Info Modify successfully!", {
                    theme: "light"
                });
                navigate("/clubEvents")
            } else {
                toast.error("Failed to Modify Event Info", {
                    theme: "light"
                });
            }

        } catch (err) {
            console.error('Error:', err);
        }
    }

    return (
        <div className="flex justify-center items-center w-screen md:w-[calc(100vw-207px)] bg-gray-100 p-4 ">
            <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-5xl mx-4">
                <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Modify Event Info</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Banner */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Banner (URL)</label>
                        <input
                            type="text"
                            name="banner"
                            value={eventData?.banner}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 border-[1px]  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        />
                        <div className='flex p-1 justify-center content-center items-center'>
                            <p>Get <span className='text-xl font-bold'>Direct link</span> for IMG from -= </p>
                            <button
                                type="button"
                                className="w-fit bg-indigo-600 text-white px-2 py-1 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                                onClick={() => window.open('https://postimages.org/')}
                            >
                                Get IMG Link
                            </button>
                        </div>
                    </div>


                    {/* Main Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Main Title</label>
                        <input
                            type="text"
                            name="mainTitle"
                            value={eventData?.mainTitle}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 border-[1px]  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        />
                    </div>

                    {/* Second Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Second Title</label>
                        <input
                            type="text"
                            name="secondTitle"
                            value={eventData?.secondTitle}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 border-[1px]  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                        />
                    </div>

                    {/* Event Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                        <input
                            type="date"
                            name="eventDate"
                            value={eventData?.eventDate}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 border-[1px]  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        />
                    </div>

                    {/* Event Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Time</label>
                        <input
                            type="time"
                            name="eventTime"
                            value={eventData?.eventTime}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 border-[1px]  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        />
                    </div>

                    {/* Event Duration */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Duration</label>
                        <input
                            type="text"
                            name="eventDuration"
                            value={eventData?.eventDuration}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 border-[1px]  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        />
                    </div>

                    {/* Type of Event */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type of Event</label>
                        <input
                            type="text"
                            name="typeOfEvent"
                            value={eventData?.typeOfEvent}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 border-[1px]  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        />
                    </div>


                    {/* Venue */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                        <input
                            type="text"
                            name="venue"
                            value={eventData?.venue}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md  border-gray-300 border-[1px]  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={eventData?.description}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 border-[1px]  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white px-4 py-3 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Modify Event Info
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditClubEvent
