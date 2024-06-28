import full_Logo from "../assets/Colour01.png";
import small_Logo from "../assets/Colour01 copy.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { getToken, getMessaging } from "firebase/messaging";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { getDatabase, ref, push } from "firebase/database";
import { getAuth } from "firebase/auth";

interface Props {
    user: {
        uid: object;
    } | {};
}

const Header = ({ user }: Props) => {
    const auth = getAuth();
    const data = user
    const messaging = getMessaging();

    const requestPermission = async () => {
        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
            toast.success("Notification Enable", {
                theme: "dark"
            })
            await getToken(messaging, { vapidKey: 'BN0KnW-O5Ul6YYNYJbylMtVbx3DgNhGP-S08PGHne6ZHCxjY1APtrxxbSqBUnU7sDr1kUaEA3sJaQY5qhgoM9Bk' })
        } else if (permission == 'denied') {
            alert('Permission denied');
            toast.error("Notification Disable", {
                theme: "dark",
            })
        }
    }

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            const database = getDatabase();
            const timestampsRef = ref(database, '/logs/' + uid);
            push(timestampsRef, {
                time: Date()
            });
        }
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
                <IoMdNotificationsOutline className="text-[40px] ml-2" />
                <img className="h-11 rounded-full ml-2" src={data.user.photoURL} alt="User Image" />
            </div>
        </div>
    )
}

export default Header
