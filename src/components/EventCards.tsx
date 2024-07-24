import { CiLocationOn } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";
import { Link } from "react-router-dom";

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
}

const EventCards = ({clubName, typeOfEvent, mainTitle, secondTitle, venue, eventDate, eventTime, _id, key}: Event) => {
    return (
        <div className="flex flex-col min-w-[280px] p-1 justify-center items-end rounded-2xl border border-[#e1e5ea] relative bg-[#f6f7f9] " key={_id}>
            <div className="flex flex-col w-full grow ">
                <div className="flex items-center gap-2 p-3 px-4 rounded-t-xl border border-[#e1e5ea] bg-[#fff] text-[#16191d] text-xs leading-[120%] tracking-wide font-medium cursor-pointer">
                    {clubName}
                </div>
                <div className="flex flex-col items-start justify-center gap-[8px] p-[16px] pb-[24px] rounded-bl-[12px] rounded-br-[12px] border-l border-r border-b border-[#e1e5ea] bg-[#fff] flex-grow cursor-pointer">
                    <div className="flex items-center gap-[8px]">
                        <div className="flex items-center gap-[4px] p-[4px] rounded-[6px] border border-[#ffd580] bg-[#fff3d6]">
                            <img src="https://d3dyfaf3iutrxo.cloudfront.net/general/upload/692729ccc85d4792a3717df53cb99793-note-1.svg" />
                        </div>
                        <div className="text-[#16191d] text-[12px] leading-[120%] tracking-[0.4px] font-[550]">
                            {typeOfEvent}
                        </div>
                    </div>
                    <div className="text-[#16191d] text-[16px] leading-[160%] tracking-[0.1px] font-[550] overflow-hidden flex-grow line-clamp-2">
                        {mainTitle}
                    </div>
                    <div className="text-[#5b6271] text-[12px] leading-[120%] tracking-[0.4px] font-[450] ">
                        {secondTitle}
                    </div>
                    <div className="text-[#454950] text-[12px] leading-[120%] tracking-[0.4px] font-[450] flex gap-1">
                        <CiLocationOn /> Venue: {venue}
                    </div>
                    <div className="text-[#454950] text-[12px] leading-[120%] tracking-[0.4px] font-[450] flex gap-1">
                        <CiCalendarDate /> Date: {eventDate}
                    </div>
                    <div className="text-[#454950] text-[12px] leading-[120%] tracking-[0.4px] font-[450] flex gap-1">
                        <CiTimer /> Time: {eventTime}
                    </div>
                </div>
                <div className="flex items-center justify-center p-3 px-[16px]">
                    <Link to={`event/${key}`} className="flex items-center justify-center w-[120px] h-[40px] min-h-[40px] p-[8px] px-[12px] rounded-[8px] bg-[#0b0c0e] text-[#fff] text-[14px] leading-[160%] tracking-[0.4px] font-[550] cursor-pointer hover:shadow-xl">
                        Join
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EventCards
