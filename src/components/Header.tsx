import full_Logo from "../assets/Colour01.png";
import small_Logo from "../assets/Colour01 copy.png";
import { IoMdNotificationsOutline } from "react-icons/io";

interface Props {
    user: {
        uid: object;
    } | {};
}

const Header = ({ user }: Props) => {
    const data = user
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
