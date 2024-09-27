import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateEvent = () => {
    const [eventData, setEventData] = useState({
        banner: '',
        description: '',
        eventDate: '',
        eventDuration: '',
        eventTime: '',
        mainTitle: '',
        secondTitle: '',
        typeOfEvent: '',
        venue: ''
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
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
            }
            console.log(headers);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
                method: 'POST',
                headers,
                body: JSON.stringify(eventData)
            });

            if (response.ok) {
                toast.success("Event created successfully!", {
                    theme: "light"
                });
                setEventData({
                    banner: '',
                    description: '',
                    eventDate: '',
                    eventDuration: '',
                    eventTime: '',
                    mainTitle: '',
                    secondTitle: '',
                    typeOfEvent: '',
                    venue: ''
                });
            } else {
                toast.error("Failed to create event!", {
                    theme: "light"
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex justify-center items-center w-screen md:w-[calc(100vw-207px)] bg-gray-100 p-4 ">
            <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-5xl mx-4">
                <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Create Event</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Banner */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Banner (URL)</label>
                        <input
                            type="text"
                            name="banner"
                            value={eventData.banner}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        />
                    </div>

                    {/* Main Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Main Title</label>
                        <input
                            type="text"
                            name="mainTitle"
                            value={eventData.mainTitle}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        />
                    </div>

                    {/* Second Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Second Title</label>
                        <input
                            type="text"
                            name="secondTitle"
                            value={eventData.secondTitle}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                        />
                    </div>

                    {/* Club Name */}
                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Club Name</label>
                        <input
                            type="text"
                            name="clubName"
                            value={eventData.clubName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        />
                    </div> */}

                    {/* Event Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                        <input
                            type="date"
                            name="eventDate"
                            value={eventData.eventDate}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        />
                    </div>

                    {/* Event Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Time</label>
                        <input
                            type="time"
                            name="eventTime"
                            value={eventData.eventTime}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        />
                    </div>

                    {/* Event Duration */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Duration</label>
                        <input
                            type="text"
                            name="eventDuration"
                            value={eventData.eventDuration}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        />
                    </div>

                    {/* Type of Event */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type of Event</label>
                        <input
                            type="text"
                            name="typeOfEvent"
                            value={eventData.typeOfEvent}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        />
                    </div>


                    {/* Venue */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                        <input
                            type="text"
                            name="venue"
                            value={eventData.venue}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={eventData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white px-4 py-3 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Create Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
