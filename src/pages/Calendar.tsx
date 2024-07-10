import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect, useState } from "react";
import { getDatabase, ref, get, child } from "firebase/database";

const localizer = momentLocalizer(moment);

interface MyEvent {
    title: string;
    start: Date;
    end: Date;
}

const MyCalendar: React.FC = () => {
    const [view, setView] = useState<View>('month');
    const [events, setEvents] = useState<MyEvent[]>();

    useEffect(() => {
        const db = getDatabase();
        const dbRef = ref(db);
        get(child(dbRef, `/event/calendarEvent`)).then((snapshot) => {
            if (snapshot.exists()) {
                const data: MyEvent[] = [];
                snapshot.forEach((childSnapshot) => {
                    data.push(childSnapshot.val());
                });
                setEvents(data);
            }
        })
    }, [])

    const handleSelect = (view: View) => {
        setView(view);
    };

    console.log(events);

    return (
        <div className='w-screen md:w-[calc(100vw-207px)] h-[calc(100vh-56px)] p-4'>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={['month', 'agenda']}
                defaultView={view}
                onView={handleSelect}
            />
        </div>
    );
};

export default MyCalendar;

