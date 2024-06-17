'use client'
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {useRouter} from "next/navigation";

import {useState} from "react";
import BoardComponent from "@/components/Board/Board";
import AppLayout from "@/components/Layout/AppLayout";

export default function Home() {
    const router = useRouter()

    const user = useCurrentUser()
    const [board, setCurrentBoard] = useState()

    if(!user || !user?.id) {
        setTimeout(()=>{
            router.push('/login')
        }, 300)
        return <>No User Detected ... </>
    }

    return (
   <AppLayout>
       <BoardComponent />
   </AppLayout>
    );
}