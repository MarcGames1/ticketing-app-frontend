'use client'


import {useState} from "react";

export default function Home() {
    const [showSidebar, setShowSidebar] = useState(true);
    return (
        <div className="h-screen">
            Header
            <div className="flex board-height">
               Sidebar
                Board
            </div>
        </div>
    );
}