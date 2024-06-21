import {useEffect, useState} from "react";
import {EmployeeRole} from "@/declarations/users";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import User from "@/entities/user";
import {useUserContext} from "@/context/UserContext";

export enum AppState {
    Tickets_Board ="Tickets Board",
    Departments="Departments",
    Users = "Users"
}
const navigationData = [AppState.Tickets_Board, AppState.Users, AppState.Departments]
export interface UseAppStateReturn {
    appState: AppState;
    updateAppState: (state: AppState) => void;
    navigationData:AppState[]
}
const useAppState =(): UseAppStateReturn=>{
    const [appState, setAppState] = useState<AppState>(AppState.Tickets_Board)
    const {user} = useUserContext()
    const router = useRouter()
console.log(user)
    const updateAppState = (state:AppState)=>{
        if( !user ) {throw new Error("No user in UseAppState")}
        switch (user.role){
            case EmployeeRole.SUPERVISOR:
                setAppState(state)
                break
            case EmployeeRole.MANAGER:
                setAppState(state)
                break
            default:
                if(state === AppState.Departments || state === AppState.Users){
                    toast({title:"Permissions Error!", description:"You do not have the required role", variant: 'destructive'})
                }
                setAppState(AppState.Tickets_Board)
                break
        }
    }


    useEffect(()=>{
    const checkUser = ()=>{
        if(!user){
            toast({title:"No user Logged in", description:"Please Log In", variant: 'destructive'})
            setTimeout(()=>{
                router.push('/login')
            },300)
            return {appState, updateAppState:setAppState, navigationData}
        }
    }
    checkUser()
}, [user])

    return {appState, updateAppState, navigationData}
}

export default useAppState