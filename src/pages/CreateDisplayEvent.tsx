import { useState } from "react"
import { getDatabase, ref, push } from "firebase/database";
import { getAuth } from "firebase/auth";


const CreateDisplayEvent = () => {
    const [creteEventData, setCreateEventData] = useState({
        clubName: "",
        typeOfEvent: "Meetings",
        mainTitle: "",
        secondTitle: "",
        banner: "",
        description: "",
        eventDate: "",
        eventTime: "",
        eventDuration: "",
        venue: ""
    })

    const handleChange = (e: { target: { name: any; value: any } }) => {
        setCreateEventData({
            ...creteEventData,
            [e.target.name]: e.target.value
        })
    }

    const SubmitEvent = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            const database = getDatabase();
            const date = new Date(creteEventData.eventDate);
            const finalDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
            const timestampsRef = ref(database, '/event/displayEvent/');
            push(timestampsRef, {
                clubName: creteEventData.clubName,
                typeOfEvent: creteEventData.typeOfEvent,
                mainTitle: creteEventData.mainTitle,
                secondTitle: creteEventData.secondTitle,
                banner: creteEventData.banner,
                description: creteEventData.description,
                eventDate: finalDate,
                eventTime: creteEventData.eventTime,
                eventDuration: creteEventData.eventDuration,
                venue: creteEventData.venue,
                createdBy: uid,
                _id: Date()
            });
        }

        // useEffect(() => {
        // }, [])
    }


    return (
        <div className="w-screen md:w-[calc(100vw-207px)] h-[calc(100vh-56px)] flex flex-col  items-center p-4 ">
            <h1 className="">Create A Display Event</h1>
            <div className="bg-[#f6f7f9] rounded-[6px] p-3 w-full mt-2">
                <div className="p-3 w-full ">
                    <h1 className="text-slate-500 text-xl font-bold">Name of Club</h1>
                    <input type="text" className="mt-2 w-full p-1 rounded-[4px]" name="clubName" value={creteEventData.clubName} onChange={handleChange} placeholder="Enter the Name of Club"></input>
                </div>
                <div className="p-3 w-full ">
                    <h1 className="text-slate-500 text-xl font-bold">Select Type of Event</h1>
                    <select name="typeOfEvent" className="mt-2 w-full p-1 rounded-[4px]" value={creteEventData.typeOfEvent} onChange={handleChange}>
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
                <div className="p-3 w-full ">
                    <h1 className="text-slate-500 text-xl font-bold">Main Heading of Event</h1>
                    <input type="text" className="mt-2 w-full p-1 rounded-[4px]" name="mainTitle" value={creteEventData.mainTitle} onChange={handleChange} placeholder="Enter the Main Heading of Event"></input>
                </div>
                <div className="p-3 w-full ">
                    <h1 className="text-slate-500 text-xl font-bold">Sub Heading of Event</h1>
                    <input type="text" className="mt-2 w-full p-1 rounded-[4px]" name="secondTitle" value={creteEventData.secondTitle} onChange={handleChange} placeholder="Enter the Sub Heading of Event"></input>
                </div>
                <div className="p-3 w-full ">
                    <h1 className="text-slate-500 text-xl font-bold">Description of Event </h1>
                    <textarea className="mt-2 w-full p-1 rounded-[4px]" name="description" value={creteEventData.description} onChange={handleChange} placeholder="Enter the Description of Event" minLength={60} ></textarea>
                </div>
                <div className="p-3 w-full ">
                    <h1 className="text-slate-500 text-xl font-bold">Date of Event</h1>
                    <input type="date" className="mt-2 w-full p-1 rounded-[4px]" name="eventDate" value={creteEventData.eventDate} onChange={handleChange} placeholder="Enter the Date of Event"></input>
                </div>
                <div className="p-3 w-full ">
                    <h1 className="text-slate-500 text-xl font-bold">Time of Event</h1>
                    <input type="time" className="mt-2 w-full p-1 rounded-[4px]" name="eventTime" value={creteEventData.eventTime} onChange={handleChange} placeholder="Enter the Time of Event"></input>
                </div>
                <div className="p-3 w-full ">
                    <h1 className="text-slate-500 text-xl font-bold">Duration of Event</h1>
                    <input type="text" className="mt-2 w-full p-1 rounded-[4px]" name="eventDuration" value={creteEventData.eventDuration} onChange={handleChange} placeholder="Enter the Duration of Event"></input>
                </div>
                <div className="p-3 w-full ">
                    <h1 className="text-slate-500 text-xl font-bold">Venue of Event</h1>
                    <input type="text" className="mt-2 w-full p-1 rounded-[4px]" name="venue" value={creteEventData.venue} onChange={handleChange} placeholder="Enter the Venue of Event"></input>
                </div>
                <div className="p-3 w-full ">
                    <button type="button" className="text-slate-500 text-xl font-bold bg-[#f6f7f9] rounded-[6px] border border-black hover:bg-slate-600 hover:text-white" onClick={SubmitEvent}>Add this Event</button>
                </div>
            </div>
        </div>
    )
}

export default CreateDisplayEvent
