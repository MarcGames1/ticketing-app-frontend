'use client'
import {Iuser} from "@/declarations/users";
import {useRouter} from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";

export function useCurrentUser() {
    const router = useRouter()
    const [user, setUserToLS] = useLocalStorage("user");
    if(!user) {
        router.push('/login')
    }

        return {user}

    }


