'use client'
import SidebarToggle from "@/components/Sidebar/SidebarToggle";
import ThemeToggle from "@/components/Sidebar/ThemeToggle";
import {Dispatch} from "react";
import useWindowSize from "@/hooks/useWindowSize";
import BoardContainer from "@/components/Sidebar/BoardContainer";
import LoggedUserDetails from "@/components/Sidebar/LoggedUserDetails";

const Sidebar = ({ showSidebar, setShowSidebar}:{showSidebar:boolean; setShowSidebar:Dispatch<boolean>}) => {

    const {width} = useWindowSize();
    if (width < 768) return null;



    return (
        <div className={`pb-28 flex gap-5 flex-col items-start py-7 border-r bg-white-50 text-darkGrey  border-lightGreyLine dark:bg-darkGrey dark:border-darkGreyLine transition-all duration-300 ${showSidebar ? 'translate-x-0 min-w-[260px] lg:min-w-[300px]' : '-translate-x-[300px] w-0'}`}>
            <BoardContainer/>
            <LoggedUserDetails />
            <ThemeToggle />
            <SidebarToggle show={showSidebar} setShow={setShowSidebar}/>
        </div>
    )
}
export default Sidebar