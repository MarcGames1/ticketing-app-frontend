import {clearLocalStorage} from "@/lib/ApiClient/utils";
import Auth from "@/entities/Auth";
import {toast} from "@/components/ui/use-toast";
import api, {ApiClientError} from "@/lib/ApiClient";
import {IloginResponseData} from "@/lib/utils";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {Iuser} from "@/declarations/users";
import {IcreateTicketData, TaskStatus} from "@/declarations/tickets";

class Actions {
    static ChangeTicketStatus: (status: TaskStatus) => void;

    static Logout() {
        clearLocalStorage()

        Auth.signOut()
        toast({title: "Logging you out", content: 'redirecting to login page ...'})
    }

    static async Login(data: any) {
        let res = await api.post('/api/auth/login', data, {headers: {"Content-Type": "application/json"}})
        if ((res instanceof ApiClientError) || !res.data.ok && !res.data.id) {

            // @ts-ignore
            toast({
                title: String(res.status),
                // @ts-ignore
                description: res.message || "UNKNOWN SERVER ERROR",
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


}
export default Actions