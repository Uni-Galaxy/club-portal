import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect, useState } from "react";

const localizer = momentLocalizer(moment);

interface Event {
    id: string;
    banner: string;
    clubName: string;
    description: string;
    eventDate: string;
    eventDuration: string;
    eventTime: string;
    mainTitle: string;
    secondTitle: string;
    typeOfEvent: string;
    venue: string;
    createdAt: Date;
    updatedAt: Date;
    clubId?: number;
}


const MyCalendar: React.FC = () => {
    const [view, setView] = useState<View>('month');
    const [events, setEvents] = useState<Event[]>();

    function parseDuration(duration: string): number {
        const timeParts = duration.match(/(\d+)(h|m)/g); 
        let milliseconds = 0;

        timeParts?.forEach(part => {
            const value = parseInt(part);
            if (part.includes('h')) {
                milliseconds += value * 60 * 60 * 1000;
            } else if (part.includes('m')) {
                milliseconds += value * 60 * 1000;
            }
        });

        return milliseconds;
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/events`
                const response = await fetch(url);
                const data = await response.json();
                setEvents(data);
            } catch (err) {
                console.error(err);
            }
        }

        getData();
    }, [])

    const processEventsData: {
        title: string; 
        start: Date;
        end: Date;
    }[] = []
    
    if (events) events.forEach((e) => {
        processEventsData.push({
            title: e.mainTitle,
            start: new Date(`${e.eventDate} ${e.eventTime}`),
            end: new Date(
                new Date(`${e.eventDate} ${e.eventTime}`).getTime() + parseDuration(e.eventDuration)
            )
        });
    })

    const handleSelect = (view: View) => {
        setView(view);
    };

    return (
        <div className='w-screen md:w-[calc(100vw-207px)] h-[calc(100vh-56px)] p-4'>
            <Calendar
                localizer={localizer}
                events={processEventsData}
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

