'use client'
import {useRouter} from "next/navigation";

import AppLayout from "@/components/Layout/AppLayout";

import MainComponent from "@/components/MainComponent";
import {useUserContext} from "@/context/UserContext";
import {useEffect} from "react";

export default function Home() {
    const router = useRouter()

    const {user} = useUserContext()

    useEffect(() => {
        const redirectUser = () => {
            if (!user || !user?.id) {
                setTimeout(() => {
                    router.push('/login')
                }, 300)
            }
        }
        redirectUser()
    }, [user])

    if (!user) {
        return <>No User Detected ... </>
    } else {
        return (
            <AppLayout>
                <MainComponent/>
            </AppLayout>
        );
    }
}


