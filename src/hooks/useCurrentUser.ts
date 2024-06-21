'use client'
import {Iuser} from "@/declarations/users";
import useLocalStorage,{LocalStoredData} from "@/hooks/useLocalStorage";
import User from "@/entities/user";


export function useCurrentUser() {

    const [user, setUserToLS] = useLocalStorage<User>(LocalStoredData.user);
    if(user instanceof User){
        return user

    }else {

        return [undefined, setUserToLS] as const

    }

    }


