'use client'
import {ReactNode, useEffect, useState} from "react";
import BoardComponent from "@/components/Board/Board";
import useAppState from "@/hooks/useAppState";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import AppLayoutProvider from "@/components/Layout/AppLayoutProvider";
import Auth from "@/entities/Auth";


interface AppLayoutProps{
    children:ReactNode
}
const AppLayout = ({children}:AppLayoutProps) =>{

    const [showSidebar, setShowSidebar] = useState(true);

    return <AppLayoutProvider>
        <div className="h-screen">
            <Header />
            <div className="flex board-height">
                <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                {children}
            </div>
        </div>

    </AppLayoutProvider>
}
export default AppLayout