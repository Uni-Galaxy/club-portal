import React, { useState, ChangeEvent, FormEvent } from 'react';
import { getDatabase, ref, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';

interface EventData {
    title: string;
    startYear: number;
    endYear: number;
    startMonth: number;
    endMonth: number;
    startDay: number;
    endDay: number;
    startHour: number;
    endHour: number;
    startMinute: number;
    endMinute: number;
}

const CreateCalenderEvent: React.FC = () => {
    const [createCalenderData, setCreateCalenderData] = useState<EventData>({
        title: '',
        startYear: 2024,
        endYear: 2024,
        startMonth: 1,
        endMonth: 1,
        startDay: 1,
        endDay: 1,
        startHour: 1,
        endHour: 1,
        startMinute: 1,
        endMinute: 1
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setCreateCalenderData({
            ...createCalenderData,
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
            const eventRef = ref(database, '/event/calendarEvent/');
            push(eventRef, {
                title: createCalenderData.title,
                start: {
                    year: createCalenderData.startYear,
                    month: createCalenderData.startMonth,
                    date: createCalenderData.startDay,
                    hours: createCalenderData.startHour,
                    minute: createCalenderData.startMinute
                },
                end: {
                    year: createCalenderData.endYear,
                    month: createCalenderData.endMonth,
                    date: createCalenderData.endDay,
                    hours: createCalenderData.endHour,
                    minute: createCalenderData.endMinute
                },
                createdBy: uid
            });
            setCreateCalenderData({
                title: '',
                startYear: 2024,
                endYear: 2024,
                startMonth: 1,
                endMonth: 1,
                startDay: 1,
                endDay: 1,
                startHour: 1,
                endHour: 1,
                startMinute: 1,
                endMinute: 1
            });
            toast.success("Event Created Successfully in Calender", {
                theme: "light"
            });
        } else {
            toast.error("Failed to Create new Event", {
                theme: "light"
            });
        }
    };

    return (
        <div className="w-screen md:w-[calc(100vw-207px)] h-[calc(100vh-56px)] flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">Create A <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">Calender Event</mark></h1>
            <form className="bg-[#f6f7f9] rounded-[6px] p-3 w-full mt-2" onSubmit={submitEvent}>
                <div className="p-3 w-full">
                    <label htmlFor="title" className="text-slate-500 text-xl font-bold">Event Title</label>
                    <input type="text" id="title" className="mt-2 w-full p-1 rounded-[4px]" name="title" value={createCalenderData.title} onChange={handleChange} placeholder="Enter the Title of Event" required />
                </div>
                <div className="p-3 w-full">
                    <label htmlFor="startYear" className="text-slate-500 text-xl font-bold">Event Start Year</label>
                    <input type="number" id="startYear" className="mt-2 w-full p-1 rounded-[4px]" name="startYear" value={createCalenderData.startYear} onChange={handleChange} required />
                </div>
                <div className="p-3 w-full">
                    <label htmlFor="startMonth" className="text-slate-500 text-xl font-bold">Event Start Month</label>
                    <input type="number" id="startMonth" className="mt-2 w-full p-1 rounded-[4px]" name="startMonth" value={createCalenderData.startMonth} onChange={handleChange} required />
                </div>
                <div className="p-3 w-full">
                    <label htmlFor="startDay" className="text-slate-500 text-xl font-bold">Event Start Day</label>
                    <input type="number" id="startDay" className="mt-2 w-full p-1 rounded-[4px]" name="startDay" value={createCalenderData.startDay} onChange={handleChange} required />
                </div>
                <div className="p-3 w-full">
                    <label htmlFor="startHour" className="text-slate-500 text-xl font-bold">Event Start Hour</label>
                    <input type="number" id="startHour" className="mt-2 w-full p-1 rounded-[4px]" name="startHour" value={createCalenderData.startHour} onChange={handleChange} required />
                </div>
                <div className="p-3 w-full">
                    <label htmlFor="startMinute" className="text-slate-500 text-xl font-bold">Event Start Minute</label>
                    <input type="number" id="startMinute" className="mt-2 w-full p-1 rounded-[4px]" name="startMinute" value={createCalenderData.startMinute} onChange={handleChange} required />
                </div>
                <div className="p-3 w-full">
                    <label htmlFor="endYear" className="text-slate-500 text-xl font-bold">Event End Year</label>
                    <input type="number" id="endYear" className="mt-2 w-full p-1 rounded-[4px]" name="endYear" value={createCalenderData.endYear} onChange={handleChange} required />
                </div>
                <div className="p-3 w-full">
                    <label htmlFor="endMonth" className="text-slate-500 text-xl font-bold">Event End Month</label>
                    <input type="number" id="endMonth" className="mt-2 w-full p-1 rounded-[4px]" name="endMonth" value={createCalenderData.endMonth} onChange={handleChange} required />
                </div>
                <div className="p-3 w-full">
                    <label htmlFor="endDay" className="text-slate-500 text-xl font-bold">Event End Day</label>
                    <input type="number" id="endDay" className="mt-2 w-full p-1 rounded-[4px]" name="endDay" value={createCalenderData.endDay} onChange={handleChange} required />
                </div>
                <div className="p-3 w-full">
                    <label htmlFor="endHour" className="text-slate-500 text-xl font-bold">Event End Hour</label>
                    <input type="number" id="endHour" className="mt-2 w-full p-1 rounded-[4px]" name="endHour" value={createCalenderData.endHour} onChange={handleChange} required />
                </div>
                <div className="p-3 w-full">
                    <label htmlFor="endMinute" className="text-slate-500 text-xl font-bold">Event End Minute</label>
                    <input type="number" id="endMinute" className="mt-2 w-full p-1 rounded-[4px]" name="endMinute" value={createCalenderData.endMinute} onChange={handleChange} required />
                </div>
                <div className="p-3 w-full">
                    <button type="submit" className="text-slate-500 text-xl font-bold bg-[#f6f7f9] rounded-[6px] border border-black hover:bg-slate-600 hover:text-white">Add this Event</button>
                </div>
            </form>
        </div>
    );
};

export default CreateCalenderEvent;
