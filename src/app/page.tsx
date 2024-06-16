'use client'


import {useState} from "react";
import BoardComponent from "@/components/Board/Board";

export default function Home() {
    const [showSidebar, setShowSidebar] = useState(true);
    return (
        <div className="h-screen">
            Header
            <div className="flex board-height">
               Sidebar
                <BoardComponent />
            </div>
        </div>
    );
}