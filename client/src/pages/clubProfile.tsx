import { useEffect, useState } from 'react';
import { FallingLines } from "react-loader-spinner";
import { Link } from 'react-router-dom';

interface Club {
    club_id: number;
    name: string;
    description?: string;
    logo_url?: string;
    club_email: string;
    president: string;
    president_email: string;
    membership_form_url?: string;
    accepting_members: string;
    website_url?: string;
    created_at: string;
    updated_at: string;
    club_account_id: string;
}


const ClubProfile = () => {
    const [clupProfileData, setClupProfile] = useState<Club>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const data = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const headers: HeadersInit = {};
                if (token) {
                    headers['Authorization'] = token;
                }
                const url = `${import.meta.env.VITE_API_URL}/clubs/profile`
                const response = await fetch(url, {
                    method: 'GET',
                    headers
                });
                const data = await response.json();
                setClupProfile(data)
                setLoading(false)

            } catch (err) {
                console.log(err);
            }
        }
        data();
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center">
                <FallingLines color="#4fa94d" width="100" visible={true} />
                <h1 className="">Loading Profile Info</h1>
            </div>
        )
    } else {
        return (
            <div className="w-screen md:w-[calc(100vw-207px)] h-[calc(100vh-56px)] flex flex-col  items-center p-4 ">
                <div className="w-full bg-[#f6f7f9] rounded-[6px] p-3">
                    <h1 className="text-slate-700 text-3xl font-bold">Club Profile</h1>
                </div>
                <div className=" flex flex-col md:flex-row gap-2 p-2 w-full ">
                    <div className="md:w-[33%] w-full bg-[#f6f7f9] rounded-[6px] p-3 flex flex-col justify-center h-fit">
                        {clupProfileData?.logo_url != null && <img src={clupProfileData.logo_url} alt="User Image" className="rounded-full h-44 m-auto" />}
                        <h3 className="text-slate-700 text-2xl font-bold m-auto pt-2"> {clupProfileData?.name} </h3>
                        <hr className="bg-slate-700 h-[2px] mt-2" />
                        <h4 className="text-slate-700 text-xl font-bold m-auto pt-2"> Club </h4>
                        <hr className="bg-slate-700 h-[2px] mt-2" />
                        <Link
                            className="inline-flex items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring px-1 py-2 mt-1"
                            to={`/clubProfile/edit`}
                        >
                            Edit Club Details
                        </Link>
                        {/* <h4 className="text-slate-700 text-xl font-bold m-auto pt-2"> {Year} </h4> */}
                    </div>
                    <div className="md:w-[66%] w-full flex flex-col justify-center h-fit gap-3">
                        <div className="bg-[#f6f7f9] rounded-[6px] p-3 ">
                            <h1 className="text-slate-500 text-xl font-bold"> Club Profile</h1>
                            <div className="border-b-[1px] border-[#e1e5ea] flex w-full p-3">
                                <div className="w-[33%] text-slate-700 text-xl font-bold"> Club Name</div>
                                <div className="w-[66%] text-slate-700 text-xl "> {clupProfileData?.name} </div>
                            </div>
                            <div className="border-b-[1px] border-[#e1e5ea] flex w-full p-3">
                                <div className="w-[33%] text-slate-700 text-xl font-bold"> Club Email</div>
                                <div className="w-[66%] text-slate-700 text-xl truncate"> {clupProfileData?.club_email} </div>
                            </div>
                            <div className="border-b-[1px] border-[#e1e5ea] flex w-full p-3">
                                <div className="w-[33%] text-slate-700 text-xl font-bold"> Club description</div>
                                <div className="w-[66%] text-slate-700 text-xl"> {clupProfileData?.description} </div>
                            </div>
                            <div className="border-b-[1px] border-[#e1e5ea] flex w-full p-3">
                                <div className="w-[33%] text-slate-700 text-xl font-bold"> Club Website</div>
                                <div className="w-[66%] text-slate-700 text-xl truncate cursor-pointer" onClick={() => window.open(clupProfileData?.website_url, "_blank")} > {clupProfileData?.website_url} </div>
                            </div>
                        </div>
                        <div className="bg-[#f6f7f9] rounded-[6px] p-3 ">
                            <h1 className="text-slate-500 text-xl font-bold"> Club president Info </h1>
                            <div className="border-b-[1px] border-[#e1e5ea] flex w-full py-3 px-1">
                                <div className="w-[33%] text-slate-700 text-xl font-bold m-1"> President Name</div>
                                <div className="w-[66%] text-slate-700 text-xl "> {clupProfileData?.president} </div>
                            </div>
                            <div className="border-b-[1px] border-[#e1e5ea] flex w-full py-3 px-1">
                                <div className="w-[33%] text-slate-700 text-xl font-bold m-1"> President Email</div>
                                <div className="w-[66%] text-slate-700 text-xl truncate"> {clupProfileData?.president_email} </div>
                            </div>
                        </div>
                        <div className="bg-[#f6f7f9] rounded-[6px] p-3 ">
                            <h1 className="text-slate-500 text-xl font-bold"> Club Membership </h1>
                            <div className="border-b-[1px] border-[#e1e5ea] flex w-full py-3 px-1">
                                <div className="w-[33%] text-slate-700 text-xl font-bold m-1"> Membership From Link </div>
                                <div className="w-[66%] text-slate-700 text-xl cursor-pointer truncate" onClick={() => window.open(clupProfileData?.membership_form_url, "_blank")} > {clupProfileData?.membership_form_url} </div>
                            </div>
                            <div className="border-b-[1px] border-[#e1e5ea] flex w-full py-3 px-1">
                                <div className="w-[33%] text-slate-700 text-xl font-bold m-1"> Accepecting New Members </div>
                                <div className="w-[66%] text-slate-700 text-xl "> {clupProfileData?.accepting_members ? "Yes" : "No"} </div>
                            </div>
                        </div>
                        <div className="bg-[#f6f7f9] rounded-[6px] p-3 ">
                            <h1 className="text-slate-500 text-xl font-bold"> Club Account Data </h1>
                            <div className="border-b-[1px] border-[#e1e5ea] flex w-full py-3 px-1">
                                <div className="w-[33%] text-slate-700 text-xl font-bold m-1"> Created at: </div>
                                <div className="w-[66%] text-slate-700 text-xl "> {clupProfileData?.created_at} </div>
                            </div>
                            <div className="border-b-[1px] border-[#e1e5ea] flex w-full py-3 px-1">
                                <div className="w-[33%] text-slate-700 text-xl font-bold m-1"> Last Modification at: </div>
                                <div className="w-[66%] text-slate-700 text-xl "> {clupProfileData?.updated_at} </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ClubProfile
