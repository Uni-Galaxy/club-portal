import { getAuth } from "firebase/auth"

const Profile = () => {
    const auth = getAuth()
    let Stream, Year

    if (auth.currentUser?.email != null) {
        // Stream defining
        if (auth.currentUser?.email.includes("csai")) {
            Stream = "B.Tech CSAI"
        } else {
            if (auth.currentUser?.email.includes(".club")) {
                Stream = "Club Account"
            } else {
                Stream = "B.Tech CSE"
            }
        }
        // Year defining
        if (auth.currentUser?.email.includes("23")) {
            Year = "2nd Year"
        } else {
            if (auth.currentUser?.email.includes("24")) {
                Year = "1st Year"
            } else {
                if (auth.currentUser?.email.includes("22")) {
                    Year = "3rd Year"
                } else {
                    if (auth.currentUser?.email.includes("21")) {
                        Year = "4th Year"
                    }
                }
            }
        }
    }

    return (
        <div className="w-screen md:w-[calc(100vw-207px)] h-[calc(100vh-56px)] flex flex-col  items-center p-4 ">
            <div className="w-full bg-[#f6f7f9] rounded-[6px] p-3">
                <h1 className="text-slate-700 text-3xl font-bold">Profile</h1>
            </div>
            <div className=" flex flex-col md:flex-row gap-2 p-2 w-full ">
                <div className="md:w-[33%] w-full bg-[#f6f7f9] rounded-[6px] p-3 flex flex-col justify-center h-fit">
                    {auth.currentUser?.photoURL != null && <img src={auth.currentUser?.photoURL} alt="User Image" className="rounded-full h-44 w-44 m-auto" />}
                    <h3 className="text-slate-700 text-2xl font-bold m-auto pt-2"> {auth.currentUser?.displayName} </h3>
                    <hr className="bg-slate-700 h-[2px] mt-2" />
                    <h4 className="text-slate-700 text-xl font-bold m-auto pt-2"> {Stream} </h4>
                    <h4 className="text-slate-700 text-xl font-bold m-auto pt-2"> {Year} </h4>
                </div>
                <div className="md:w-[66%] w-full flex flex-col justify-center h-fit gap-3">
                    <div className="bg-[#f6f7f9] rounded-[6px] p-3 ">
                        <h1 className="text-slate-500 text-xl font-bold"> User Profile</h1>
                        <div className="border-b-[1px] border-[#e1e5ea] flex w-full p-3">
                            <div className="w-[33%] text-slate-700 text-2xl font-bold"> Name</div>
                            <div className="w-[66%] text-slate-700 text-2xl "> {auth.currentUser?.displayName} </div>
                        </div>
                        <div className="border-b-[1px] border-[#e1e5ea] flex w-full p-3">
                            <div className="w-[33%] text-slate-700 text-2xl font-bold"> Email</div>
                            <div className="w-[66%] text-slate-700 text-2xl truncate"> {auth.currentUser?.email} </div>
                        </div>
                    </div>
                    <div className="bg-[#f6f7f9] rounded-[6px] p-3 ">
                        <h1 className="text-slate-500 text-xl font-bold"> User Account </h1>
                        <div className="border-b-[1px] border-[#e1e5ea] flex w-full py-3 px-1">
                            <div className="w-[33%] text-slate-700 text-xl font-bold m-1"> Created at: </div>
                            <div className="w-[66%] text-slate-700 text-xl "> {auth.currentUser?.metadata.creationTime} </div>
                        </div>
                        <div className="border-b-[1px] border-[#e1e5ea] flex w-full py-3 px-1">
                            <div className="w-[33%] text-slate-700 text-xl font-bold m-1"> Last Login at: </div>
                            <div className="w-[66%] text-slate-700 text-xl "> {auth.currentUser?.metadata.lastSignInTime} </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
