import full_Logo from "../assets/Colour01.png";
import small_Logo from "../assets/Colour01 copy.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { getToken, getMessaging } from "firebase/messaging";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

interface User {
    google_id: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_picture_url?: string;
    role: Role;
    account_created_at: string;
    lastlogin_at: string;
}

enum Role {
    USER = 'USER',
    CLUB = 'CLUB',
    ADMIN = 'ADMIN'
}

interface Props {
    user: string;
}

const Header = ({ user }: Props) => {
    const messaging = getMessaging();
    const router = useNavigate();

    const requestPermission = async () => {
        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
            toast.success("Notification Enable", {
                theme: "light"
            })
            await getToken(messaging, { vapidKey: 'BN0KnW-O5Ul6YYNYJbylMtVbx3DgNhGP-S08PGHne6ZHCxjY1APtrxxbSqBUnU7sDr1kUaEA3sJaQY5qhgoM9Bk' })
        } else if (permission == 'denied') {
            alert('Permission denied');
            toast.error("Notification Disable", {
                theme: "light"
            })
        }
    }

    const [userData, setuserData] = useState<User>();

    useEffect(() => {
        const userData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const headers: HeadersInit = {};
                if (token) {
                    headers['Authorization'] = token;
                }
                const url = `${import.meta.env.VITE_API_URL}/users/${user}`
                const response = await fetch(url, {
                    method: 'GET',
                    headers
                });
                const data = await response.json();
                setuserData(data)

            } catch (err) {
                console.log(err);
            }
        }

        userData()
    }, [])

    useEffect(() => {
        requestPermission();
    }, [])

    return (
        <div className="w-full h-14 flex items-center justify-between border-b-[1px] border-[#e1e5ea] pt-[6px] pb-[6px] pr-3 pl-3">
            {/* Left content */}
            <div className="hidden md:block">
                <img className="h-14" src={full_Logo} alt="University Logo" />
            </div>
            <div className="md:hidden flex items-center">
                <img className="h-10" src={small_Logo} alt="University Logo" />
            </div>
            {/* Right content */}
            <div className="flex items-center border-l-[1px] border-[#e1e5ea] ">
                {/* <IoMdNotificationsOutline className="text-[40px] ml-2" /> */}
                <div className="relative group">
                    <IoMdNotificationsOutline className="text-[40px] ml-2 hover:cursor-pointer" />
                    {/* Tooltip text */}
                    <span className="absolute top-1/2 left-[-160%] transform -translate-y-1/2 w-max bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        No Notifications Yet !
                    </span>
                </div>
                {userData?.profile_picture_url != null && <img className="h-11 rounded-full ml-2 hover:cursor-pointer" src={userData?.profile_picture_url} alt="User Image" onClick={() => router('/profile')} />}
            </div>
        </div>
    )
}

export default Header
