'use client'
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {useRouter} from "next/navigation";

import {useState} from "react";
import BoardComponent from "@/components/Board/Board";

export default function Home() {
    const router = useRouter()
    const [showSidebar, setShowSidebar] = useState(true);
    const {user} = useCurrentUser()

    return (
        <div className="h-screen">
            <div>
                Header
            </div>
            <div className="flex board-height">
               <div>Sidebar</div>
                <BoardComponent />
            </div>
        </div>
    );
}