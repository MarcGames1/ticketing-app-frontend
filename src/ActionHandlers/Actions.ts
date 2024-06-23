import {clearLocalStorage, handleApiResponse} from "@/lib/ApiClient/utils";
import Auth from "@/entities/Auth";
import {toast} from "@/components/ui/use-toast";
import api, {ApiClientError, ApiClientSuccess} from "@/lib/ApiClient";
import {IloginResponseData} from "@/lib/utils";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {Iuser} from "@/declarations/users";
import {TaskStatus} from "@/declarations/tickets";
import Ticket from '@/entities/ticket'
import {Idepartment} from "@/declarations/deptartment";
import {RegisterData} from "@/declarations/auth";


class Actions {
    static async ChangeTicketStatus(status: TaskStatus, id:number | string)  {
    const res =  await   Ticket.UpdateStatus(id, status)
    };

    static Logout() {
        clearLocalStorage()
        Auth.signOut()
        toast({title: "Logging you out", description: 'redirecting to login page ...'})
    }

    static async Login(data: any) {
        let res = await api.post('/api/auth/login', data, {headers: {"Content-Type": "application/json"}})
        if ((res instanceof ApiClientError) || !res.data.ok && !res.data.id) {
            console.clear()
            console.log(JSON.stringify(res.message, "", 2))
            console.log(res.message)
            // @ts-ignore

            toast({
                title: String("Could not log you in! "),
                // @ts-ignore
                description:res.message.message || "UNKNOWN SERVER ERROR",
                variant: 'destructive'
            });
            throw res
        } else {
            return res.data as unknown as IloginResponseData
        }
    }

    static checkUser(user: Iuser, router: AppRouterInstance) {
        if(user){
            setTimeout(()=>{
                router.push('/')
            },300)
            toast({
                title: 'Logged in Successfully',
                description: `Welcome ${user.firstName}`,
            });
        }
    }


    static async Register(data: RegisterData) {
       const res:ApiClientError | ApiClientSuccess<{nextAction:string}> = await api.post('/api/auth/signup', data)
        if(res instanceof ApiClientError) {
            toast({title: "Could not get data STATUS CODE: "+ res.status, description: res.message, variant:"destructive"})
        }
        else {
            const nextActionResponse = res.data.nextAction === "Login" ? "You Can Login" : "You Must Confirm Email Before Logging In"
            toast({title:"Registered Succesfully", description:nextActionResponse})
        }
    }
    static async getDepartments():Promise<Idepartment[]> {
        const res = api.get<Idepartment[]>('/api/departments/list');
        return await handleApiResponse<Idepartment[]>(res)
    }
}
export default Actions