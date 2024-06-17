'use client'
import {ReactNode, useState} from "react";
import BoardComponent from "@/components/Board/Board";
import useAppState from "@/hooks/useAppState";
import Sidebar from "@/components/Sidebar/Sidebar";


interface AppLayoutProps{
    children:ReactNode
}
const AppLayout = ({children}:AppLayoutProps) =>{
    const {appState, updateAppState} = useAppState()
    const [showSidebar, setShowSidebar] = useState(true);



    return <>
        <div className="h-screen">
            <div>
                Header
            </div>
            <div className="flex board-height">
                <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

                {children}
            </div>
        </div>

    </>
}
export default AppLayout