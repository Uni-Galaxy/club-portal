import { FiMenu } from "react-icons/fi";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import { FaRegCalendar } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { FaBuildingColumns } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { IoMdChatboxes } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { GoPersonAdd } from "react-icons/go";
import { BsCalendar2Event } from "react-icons/bs";

const generalNav = [
    {
        name: "Home",
        icon: <IoMdHome size={20} />,
        path: "/",
    },
    {
        name: "Clubs",
        icon: <FaBuildingColumns size={20} />,
        path: "/clubs",
    },
    {
        name: "Calendar",
        icon: <FaRegCalendar size={20} />,
        path: "/calendar",
    },
    {
        name: "Chat",
        icon: <IoMdChatboxes size={20} />,
        path: "/chat",
    },
    {
        name: "Events",
        icon: <MdEventAvailable size={20} />,
        path: "/events",
    },
    {
        name: "Profile",
        icon: <VscAccount size={20} />,
        path: "/profile",
    },
];

const ClubsNav = [
    {
        name: "Club Profile",
        icon: <VscAccount size={20} />,
        path: "/clubProfile",
    },
    {
        name: "Create Event",
        icon: <IoCreateOutline size={20} />,
        path: "/creatingEvent",
    },
    {
        name: "Member",
        icon: <GoPersonAdd size={20} />,
        path: "/addMembers",
    },
    {
        name: "Manage Events",
        icon: <BsCalendar2Event size={20} />,
        path: "/clubEvents",
    }
]

const AdminNav = [
    {
        name: "Clubs",
        icon: <IoMdHome />,
        path: "/clubs",
    }
]


interface Props {
    setIsLogin: (item: boolean) => void
    isClub: boolean;
    isAdmin: boolean;
}

const Sidebar = ({ setIsLogin, isClub, isAdmin }: Props) => {

    const [toggle, setToggle] = useState(false);

    const navigate = useNavigate();

    const changeToggle = (() => {
        setToggle(!toggle)
    })

    const signOutUser = () => {
        localStorage.removeItem("authToken");
        setIsLogin(false);
    }

    return (
        <>
            <div className="hidden md:block max-w-fit border-r-[1px] border-[#e1e5ea]" style={{ height: "calc(100vh - 56px)" }}>
                <div className="w-[207px]">
                    <div className="p-6 border-b-[1px] border-[#e1e5ea]">
                        <p className="font-mono text-sm text-[#2b303b] font-semibold ">Welcome to Club Portal</p>
                    </div>
                    <ul className="p-4 border-b-[1px] border-[#e1e5ea]">
                        {generalNav.map((item) => {
                            return (
                                <li className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl cursor-pointer" key={item.name} onClick={() => {
                                    navigate(item.path)
                                }}>
                                    <div className="flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <p>{item.name}</p>
                                </li>
                            )
                        })}
                    </ul>
                    {isClub &&
                        <div className="p-4 border-b-[1px] border-[#e1e5ea] ">
                            <div className="mb-4 p-2 rounded-xl bg-slate-400">
                                <h3 className="font-mono text-lg text-[#2b303b] font-semibold pb-1">Clubs features</h3>
                                <p>This features can only use by Clubs</p>
                            </div>
                            <ul className="">
                                {ClubsNav.map((item) => {
                                    return (
                                        <li className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl cursor-pointer" key={item.name} onClick={() => {
                                            navigate(item.path)
                                        }}>
                                            {item.icon}
                                            <p>{item.name}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                    {isAdmin &&
                        <div className="p-4 border-b-[1px] border-[#e1e5ea] ">
                            <div className="mb-4 p-2 rounded-xl bg-slate-400">
                                <h3 className="font-mono text-lg text-[#2b303b] font-semibold pb-1">Admin features</h3>
                                <p>This features can only use by Admins</p>
                            </div>
                            <ul className="">
                                {AdminNav.map((item) => {
                                    return (
                                        <li className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl cursor-pointer" key={item.name} onClick={() => {
                                            navigate(item.path)
                                        }}>
                                            {item.icon}
                                            <p>{item.name}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                    <div className="p-4 ">
                        <button className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl bg-transparent w-full cursor-pointer" onClick={signOutUser}>
                            <GoSignOut />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Phone Navbar */}

            <div className="md:hidden flex items-center w-full h-14 justify-between border-b-[1px] bg-white border-[#e1e5ea] pt-[6px] pb-[6px] pr-3 pl-3 sticky top-0 overflow-hidden z-50">
                {!toggle ? <FiMenu onClick={changeToggle} size={24} /> : <ImCross onClick={changeToggle} />}
            </div>
            {toggle &&
                <div className="md:hidden w-[200px] bg-white pt-1 top-28 border-[1px] border-[#e1e5ea] absolute z-10">
                    <ul className="p-4 border-b-[1px] border-[#e1e5ea]">
                        {generalNav.map((item) => {
                            return (
                                <li className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl cursor-pointer" key={item.name} onClick={() => {
                                    navigate(item.path)
                                    changeToggle()
                                }}>
                                    {item.icon}
                                    <p>{item.name}</p>
                                </li>
                            )
                        })}
                    </ul>
                    {isClub &&
                        <div className="p-4 border-b-[1px] border-[#e1e5ea] ">
                            <div className="mb-4 p-2 rounded-xl bg-slate-400">
                                <h3 className="font-mono text-lg text-[#2b303b] font-semibold pb-1">Clubs features</h3>
                                <p>This features can only use by Clubs</p>
                            </div>
                            <ul className="">
                                {ClubsNav.map((item) => {
                                    return (
                                        <li className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl cursor-pointer" key={item.name} onClick={() => {
                                            navigate(item.path)
                                            changeToggle()
                                        }}>
                                            {item.icon}
                                            <p>{item.name}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                    {isAdmin &&
                        <div className="p-4 border-b-[1px] border-[#e1e5ea] ">
                            <div className="mb-4 p-2 rounded-xl bg-slate-400">
                                <h3 className="font-mono text-lg text-[#2b303b] font-semibold pb-1">Admin features</h3>
                                <p>This features can only use by Admins</p>
                            </div>
                            <ul className="">
                                {AdminNav.map((item) => {
                                    return (
                                        <li className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl cursor-pointer" key={item.name} onClick={() => {
                                            navigate(item.path)
                                            changeToggle()
                                        }}>
                                            {item.icon}
                                            <p>{item.name}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                    <div className="p-4 ">
                        <button className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl bg-transparent w-full cursor-pointer" onClick={signOutUser}>
                            <GoSignOut />
                            Sign Out
                        </button>
                    </div>
                </div>
            }
        </>
    )
}

export default Sidebar
