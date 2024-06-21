'use client'
import Button from "@/components/shared/Button";
import useLocalStorage, {LocalStoredData} from "@/hooks/useLocalStorage";
import {useRouter} from "next/navigation";
import Actions from "@/ActionHandlers/Actions";
import {useEffect, useState} from "react";
import User from "@/entities/user";
import {useUserContext} from "@/context/UserContext";

const LoggedUserDetails = () => {
    const {user, setUser} = useUserContext()
    const router = useRouter()

    useEffect(() => {
       !user && setTimeout(()=>{
            router.push('/login')
        },3)
    }, [user]);
    const logoutHandler = () =>{
        Actions.Logout()
        setUser(undefined)


    }
    return user && <div
        className={'rounded flex flex-col flex-wrap p-4 w-4/5 mx-6 space-x-6 justify-center items-center bg-lightGrey dark:text-mediumGrey  dark:bg-veryDarkGrey'}>
        <span className={"text-lg "}>
            Hello {user.firstName} {user.lastName}
        </span>
        <span className={"text-sm"}>
         Access level: {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
        </span>
        <Button onClick={logoutHandler} className={'mt-6 px-5 bg-mainRed text-white text-base rounded-full p-2 transition duration-200 hover:bg-mainRedHover'}>Log Out</Button>
    </div>
}

export default LoggedUserDetails