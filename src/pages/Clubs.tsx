import ClubClouser from "../components/ClubClouser"

const Clubs = () => {
    return (
        <div className="w-screen md:w-[calc(100vw-207px)] h-[calc(100vh-56px)] flex flex-col  items-center p-4 ">
            <div className="w-full bg-[#f6f7f9] rounded-[6px] p-3">
                <h1 className="text-slate-700 text-3xl font-bold">Clubs</h1>
            </div>
            <ClubClouser />
        </div>
    )
}

export default Clubs
