import { FiMenu } from "react-icons/fi";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import { FaRegCalendar } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { FaBuildingColumns } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { useEffect, useState } from "react";
import { getDatabase, ref, get, child } from "firebase/database";

const generalNav = [
    {
        name: "Home",
        icon: <IoMdHome />,
        path: "/",
    },
    {
        name: "Clubs",
        icon: <FaBuildingColumns />,
        path: "/clubs",
    },
    {
        name: "Calendar",
        icon: <FaRegCalendar />,
        path: "/calendar",
    },
    {
        name: "Events",
        icon: <MdEventAvailable />,
        path: "/events",
    },
    {
        name: "People",
        icon: <IoMdPerson />,
        path: "/people",
    },
];

const ClubsNav = [
    {
        name: "Clubs",
        icon: <IoMdHome />,
        path: "/",
    }
]

const AdminNav = [
    {
        name: "Clubs",
        icon: <IoMdHome />,
        path: "/",
    }
]

const Sidebar = () => {

    const [isAdmin, setIsAdmin] = useState(false);
    const [isClub, setIsClub] = useState(false);
    const [toggle, setToggle] = useState(false);

    const navigate = useNavigate();

    const changeToggle = (() => {
        setToggle(!toggle)
    })
    useEffect(() => {
        const db = getDatabase();
        const dbRef = ref(db);
        // Checking that is it a Admin id or Not
        get(child(dbRef, `/checkIsAdmin`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                setIsAdmin(true);
            }
        })
        // Checking that is it a Club id or Not
        get(child(dbRef, `/checkIsClub`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                setIsClub(true);
            }
        })
    }, [])

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
                                <li className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl cursor-pointer" onClick={() => {
                                    navigate(item.path)
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
                                        <li className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl cursor-pointer" onClick={() => {
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
                                        <li className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl cursor-pointer" onClick={() => {
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
                        <button className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl bg-transparent w-full cursor-pointer">
                            <GoSignOut />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Phone Navbar */}

            <div className="md:hidden flex items-center w-full h-14 justify-between border-b-[1px] bg-white border-[#e1e5ea] pt-[6px] pb-[6px] pr-3 pl-3 sticky top-0 overflow-hidden z-50">
                {!toggle ? <FiMenu onClick={changeToggle} /> : <ImCross onClick={changeToggle} />}
            </div>
            {toggle &&
                <div className="md:hidden w-[200px] bg-white pt-1 sticky top-14 border-[1px] border-[#e1e5ea]">
                    <ul className="p-4 border-b-[1px] border-[#e1e5ea]">
                        {generalNav.map((item) => {
                            return (
                                <li className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl cursor-pointer" onClick={() => {
                                    navigate(item.path)
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
                                        <li className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl cursor-pointer" onClick={() => {
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
                                        <li className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl cursor-pointer" onClick={() => {
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
                        <button className="flex items-center  pr-4 pl-4 pt-3 pb-3 gap-2 hover:bg-[#e1e5ea] rounded-xl bg-transparent w-full cursor-pointer">
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
