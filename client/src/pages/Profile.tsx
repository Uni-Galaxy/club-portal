import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";

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

const Profile = ({ user }: Props) => {
    const [userData, setuserData] = useState<User>();
    const [loading, setLoading] = useState(true);

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
                setLoading(false)

            } catch (err) {
                console.log(err);
                setLoading(false)
            }
        }

        userData()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center">
                        <FallingLines color="#4fa94d" width="100" visible={true} />
                        <h1 className="">Loading Profile Info</h1>
                    </div>
        )
    } else {return (
        <div className="w-screen md:w-[calc(100vw-207px)] h-[calc(100vh-56px)] flex flex-col  items-center p-4 ">
            <div className="w-full bg-[#f6f7f9] rounded-[6px] p-3">
                <h1 className="text-slate-700 text-3xl font-bold">Profile</h1>
            </div>
            <div className=" flex flex-col md:flex-row gap-2 p-2 w-full ">
                <div className="md:w-[33%] w-full bg-[#f6f7f9] rounded-[6px] p-3 flex flex-col justify-center h-fit">
                    {userData?.profile_picture_url != null && <img src={userData.profile_picture_url} alt="User Image" className="rounded-full h-44 w-44 m-auto" />}
                    <h3 className="text-slate-700 text-2xl font-bold m-auto pt-2"> {userData?.first_name + " " + userData?.last_name} </h3>
                    <hr className="bg-slate-700 h-[2px] mt-2" />
                    {/* <h4 className="text-slate-700 text-xl font-bold m-auto pt-2"> {Stream} </h4> */}
                    {/* <h4 className="text-slate-700 text-xl font-bold m-auto pt-2"> {Year} </h4> */}
                </div>
                <div className="md:w-[66%] w-full flex flex-col justify-center h-fit gap-3">
                    <div className="bg-[#f6f7f9] rounded-[6px] p-3 ">
                        <h1 className="text-slate-500 text-xl font-bold"> User Profile</h1>
                        <div className="border-b-[1px] border-[#e1e5ea] flex w-full p-3">
                            <div className="w-[33%] text-slate-700 text-2xl font-bold"> Name</div>
                            <div className="w-[66%] text-slate-700 text-2xl "> {userData?.first_name + " " + userData?.last_name} </div>
                        </div>
                        <div className="border-b-[1px] border-[#e1e5ea] flex w-full p-3">
                            <div className="w-[33%] text-slate-700 text-2xl font-bold"> Email</div>
                            <div className="w-[66%] text-slate-700 text-2xl truncate"> {userData?.email} </div>
                        </div>
                    </div>
                    <div className="bg-[#f6f7f9] rounded-[6px] p-3 ">
                        <h1 className="text-slate-500 text-xl font-bold"> User Account </h1>
                        <div className="border-b-[1px] border-[#e1e5ea] flex w-full py-3 px-1">
                            <div className="w-[33%] text-slate-700 text-xl font-bold m-1"> Created at: </div>
                            <div className="w-[66%] text-slate-700 text-xl "> {userData?.account_created_at} </div>
                        </div>
                        <div className="border-b-[1px] border-[#e1e5ea] flex w-full py-3 px-1">
                            <div className="w-[33%] text-slate-700 text-xl font-bold m-1"> Last Login at: </div>
                            <div className="w-[66%] text-slate-700 text-xl "> {userData?.lastlogin_at} </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
}

export default Profile
