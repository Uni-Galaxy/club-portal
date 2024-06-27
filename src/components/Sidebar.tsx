import { FiMenu } from "react-icons/fi";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import { FaRegCalendar } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { FaBuildingColumns } from "react-icons/fa6";

const Sidebar = () => {
    
    const navigate = useNavigate();

    return (
        <>
            <div className="hidden md:block max-w-fit border-r-[1px] border-[#e1e5ea]" style={{ height: "calc(100vh - 56px)" }}>
                <div className="w-[207px]">
                    <div className="p-6 border-b-[1px] border-[#e1e5ea]">
                        <p className="font-mono text-sm text-[#2b303b] font-semibold ">Welcome to Club Portal</p>
                    </div>
                    <div >
                        <ul className="p-4 border-b-[1px] border-[#e1e5ea]">
                            <li className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl cursor-pointer" onClick={() => {
                                navigate("/")
                            }}>
                                <IoMdHome />
                                <p>Home</p>
                            </li>
                            <li className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl cursor-pointer" onClick={() => {
                                navigate("/")
                            }}>
                                <FaBuildingColumns />
                                <p>Clubs</p>
                            </li>
                            <li className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl cursor-pointer" onClick={() => {
                                navigate("/")
                            }}>
                                <FaRegCalendar />
                                <p>Calender</p>
                            </li>
                            <li className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl cursor-pointer" onClick={() => {
                                navigate("/")
                            }}>
                                <MdEventAvailable />
                                <p>Events</p>
                            </li>
                            <li className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl cursor-pointer" onClick={() => {
                                navigate("/")
                            }}>
                                <IoMdPerson />
                                <p>Profile</p>
                            </li>
                        </ul>
                        <div className="p-4 ">
                            <button className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl bg-transparent w-full cursor-pointer">
                                <GoSignOut />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:hidden flex items-center w-full h-14  justify-between border-b-[1px] border-[#e1e5ea] pt-[6px] pb-[6px] pr-3 pl-3">
                <FiMenu />
            </div>
        </>
    )
}

export default Sidebar
