'use client'
import {useRouter} from "next/navigation";

import AppLayout from "@/components/Layout/AppLayout";

import MainComponent from "@/components/MainComponent";
import {useCurrentUser} from "@/hooks/useCurrentUser";

export default function Home() {
    const router = useRouter()

    const [user, _] = useCurrentUser()

    if(!user || !user?.id) {
        setTimeout(()=>{
            router.push('/login')
        }, 300)
        return <>No User Detected ... </>
    }


    return (
   <AppLayout>
      <MainComponent />
   </AppLayout>
    );
}