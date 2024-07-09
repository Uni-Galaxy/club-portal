import React, { useState } from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface MyEvent {
    title: string;
    start: Date;
    end: Date;
}

const events: MyEvent[] = [
    {
        title: 'Meeting',
        start: new Date(2024, 6, 10, 10, 0), // 10 July 2024, 10:00 AM
        end: new Date(2024, 6, 10, 12, 0),   // 10 July 2024, 12:00 PM
    },
    {
        title: 'Lunch Break',
        start: new Date(2024, 6, 11, 13, 0), // 11 July 2024, 1:00 PM
        end: new Date(2024, 6, 11, 14, 0),   // 11 July 2024, 2:00 PM
    },
];

const MyCalendar: React.FC = () => {
    const [view, setView] = useState<View>('month');

    const handleSelect = (view: View) => {
        setView(view);
    };

    return (
        <div className='w-screen md:w-[calc(100vw-207px)] h-[calc(100vh-56px)] p-4'>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={['month', 'week', 'day', 'agenda']}
                defaultView={view}
                onView={handleSelect}
            />
        </div>
    );
};

export default MyCalendar;

