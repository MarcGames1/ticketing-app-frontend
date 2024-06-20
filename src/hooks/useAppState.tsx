import {useState} from "react";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {EmployeeRole} from "@/declarations/users";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
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
    const [user] = useCurrentUser()
    const router = useRouter()
    if(!user){
        toast({title:"No user Logged in", description:"Please Log In", variant: 'destructive'})
        setTimeout(()=>{
            router.push('/login')
        },300)
        return {appState, updateAppState:setAppState, navigationData}
    }
    const updateAppState = (state:AppState)=>{
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
    return {appState, updateAppState, navigationData}
}

export default useAppState