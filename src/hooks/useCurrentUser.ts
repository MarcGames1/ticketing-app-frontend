'use client'
import {Iuser} from "@/declarations/users";
import useLocalStorage from "@/hooks/useLocalStorage";
import {LocalStoredData} from "@/declarations/localStorage";
import {clearLocalStorage} from "@/lib/ApiClient/utils";

export function useCurrentUser() {

    const [user, setUserToLS] = useLocalStorage(LocalStoredData.user);
    if(user && user?.id){
        return [user as Iuser, setUserToLS] as const

    }else {
        clearLocalStorage()
        return [undefined, setUserToLS] as const

    }

    }


