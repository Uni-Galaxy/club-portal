import { FiMenu } from "react-icons/fi";

const Sidebar = () => {
    return (
        <>
            <div className="hidden md:block max-w-fit border-r-[1px] border-[#e1e5ea]" style={{height: "calc(100vh - 56px)"}}>
                <div className="w-[207px]">
                    <div className="p-6 border-b-[1px] border-[#e1e5ea]">
                        <p className="font-mono text-sm text-[#2b303b] font-semibold ">Welcome to Club Portal</p>
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
