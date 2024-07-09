import React, { useState, ChangeEvent, FormEvent } from 'react';
import { getDatabase, ref, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';

interface EventData {
    clubName: string;
    typeOfEvent: string;
    mainTitle: string;
    secondTitle: string;
    banner: string;
    description: string;
    eventDate: string;
    eventTime: string;
    eventDuration: string;
    venue: string;
}

const CreateDisplayEvent: React.FC = () => {
    const [createEventData, setCreateEventData] = useState<EventData>({
        clubName: '',
        typeOfEvent: 'Meetings',
        mainTitle: '',
        secondTitle: '',
        banner: '',
        description: '',
        eventDate: '',
        eventTime: '',
        eventDuration: '',
        venue: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setCreateEventData({
            ...createEventData,
            [e.target.name]: e.target.value,
        });
    };

    const submitEvent = (e: FormEvent) => {
        e.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            const database = getDatabase();
            const date = new Date(createEventData.eventDate);
            const finalDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
            const timestampsRef = ref(database, '/event/displayEvent/');
            push(timestampsRef, {
                ...createEventData,
                eventDate: finalDate,
                createdBy: uid,
                _id: Date(),
            });
        }
        setCreateEventData({
            clubName: "",
            typeOfEvent: "Meetings",
            mainTitle: "",
            secondTitle: "",
            banner: "",
            description: "",
            eventDate: "",
            eventTime: "",
            eventDuration: "",
            venue: "",
        });
    };

    return (
        <div className="w-screen md:w-[calc(100vw-207px)] h-[calc(100vh-56px)] flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">Create A <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">Display Event</mark></h1>
            <form className="bg-[#f6f7f9] rounded-[6px] p-3 w-full mt-2" onSubmit={submitEvent}>
                <div className="p-3 w-full">
                    <label htmlFor="clubName" className="text-slate-500 text-xl font-bold">Name of Club</label>
                    <input type="text" id="clubName" className="mt-2 w-full p-1 rounded-[4px]" name="clubName" value={createEventData.clubName} onChange={handleChange} placeholder="Enter the Name of Club" required />
                </div>
                <div className="p-3 w-full">
                    <label htmlFor="typeOfEvent" className="text-slate-500 text-xl font-bold">Select Type of Event</label>
                    <select id="typeOfEvent" name="typeOfEvent" className="mt-2 w-full p-1 rounded-[4px]" value={createEventData.typeOfEvent} onChange={handleChange} required>
                        <option value="Meetings">Meetings</option>
                        <option value="Social Events">Social Events</option>
                        <option value="Workshops">Workshops</option>
                        <option value="Volunteer Opportunities">Volunteer Opportunities</option>
                        <option value="Competitions">Competitions</option>
                        <option value="Trips/Outings">Trips/Outings</option>
                        <option value="Guest Speaker Events">Guest Speaker Events</option>
                        <option value="Member-Only Event">Member-Only Event</option>
                    </select>
                </div>
                <div className="p-3 w-full">
                    <label htmlFor="mainTitle" className="text-slate-500 text-xl font-bold">Main Heading of Event</label>
                    <input type="text" id="mainTitle" className="mt-2 w-full p-1 rounded-[4px]" name="mainTitle" value={createEventData.mainTitle} onChange={handleChange} placeholder="Enter the Main Heading of Event" required />
                </div>
                <div className="p-3 w-full">
                    <label htmlFor="secondTitle" className="text-slate-500 text-xl font-bold">Sub Heading of Event</label>
                    <input type="text" id="secondTitle" className="mt-2 w-full p-1 rounded-[4px]" name="secondTitle" value={createEventData.secondTitle} onChange={handleChange} placeholder="Enter the Sub Heading of Event" required/>
                </div>
                <div className="p-3 w-full">
                    <label htmlFor="description" className="text-slate-500 text-xl font-bold">Description of Event</label>
                    <textarea id="description" className="mt-2 w-full p-1 rounded-[4px]" name="description" value={createEventData.description} onChange={handleChange} placeholder="Enter the Description of Event" minLength={60} required></textarea>
                </div>
                <div className="p-3 w-full">
                    <label htmlFor="eventDate" className="text-slate-500 text-xl font-bold">Date of Event</label>
                    <input type="date" id="eventDate" className="mt-2 w-full p-1 rounded-[4px]" name="eventDate" value={createEventData.eventDate} onChange={handleChange} required />
                </div>
                <div className="p-3 w-full">
                    <label htmlFor="eventTime" className="text-slate-500 text-xl font-bold">Time of Event</label>
                    <input type="time" id="eventTime" className="mt-2 w-full p-1 rounded-[4px]" name="eventTime" value={createEventData.eventTime} onChange={handleChange} required />
                </div>
                <div className="p-3 w-full">
                    <label htmlFor="eventDuration" className="text-slate-500 text-xl font-bold">Duration of Event</label>
                    <input type="text" id="eventDuration" className="mt-2 w-full p-1 rounded-[4px]" name="eventDuration" value={createEventData.eventDuration} onChange={handleChange} placeholder="Enter the Duration of Event" required />
                </div>
                <div className="p-3 w-full">
                    <label htmlFor="venue" className="text-slate-500 text-xl font-bold">Venue of Event</label>
                    <input type="text" id="venue" className="mt-2 w-full p-1 rounded-[4px]" name="venue" value={createEventData.venue} onChange={handleChange} placeholder="Enter the Venue of Event" required />
                </div>
                <div className="p-3 w-full">
                    <button type="submit" className="text-slate-500 text-xl font-bold bg-[#f6f7f9] rounded-[6px] border border-black hover:bg-slate-600 hover:text-white">Add this Event</button>
                </div>
            </form>
        </div>
    );
};

export default CreateDisplayEvent;
