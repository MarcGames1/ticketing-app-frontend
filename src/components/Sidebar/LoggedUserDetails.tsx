'use client'
import {useCurrentUser} from "@/hooks/useCurrentUser";
import Button from "@/components/shared/Button";
import useLocalStorage from "@/hooks/useLocalStorage";
import {useRouter} from "next/navigation";
import {toast} from "@/components/ui/use-toast";
import {LocalStoredData} from "@/declarations/localStorage";
import {clearLocalStorage} from "@/lib/ApiClient/utils";
import Auth from "@/entities/Auth";
import Actions from "@/ActionHandlers/Actions";

const LoggedUserDetails = () => {
    const [_ ,setValue]= useLocalStorage(LocalStoredData.user)
    const [user] = useCurrentUser()
    const router = useRouter()

    const logoutHandler = () =>{
        Actions.Logout()
        setValue(undefined)
        setTimeout(()=>{
            router.push('/login')
        },3)
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