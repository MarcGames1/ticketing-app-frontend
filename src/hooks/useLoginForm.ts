'use client'
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";


import {z} from "zod";
import api, {ApiClientError} from "@/lib/ApiClient";
import useLocalStorage from "@/hooks/useLocalStorage";
import {handleSigninResponse, IloginResponseData} from "@/lib/utils";
import {LocalStoredData} from "@/declarations/localStorage";
import Auth from "@/entities/Auth";

export const FormSchema = z.object({
    email: z.string().email( {
        message: "Enter a valid email address",
    }),
    password: z.string().min(2, { message: "Password must have at least 6 caracters",}).max(50, { message: "Too Manny Caracters for a password don't worry about it no one will hack your account",})
})
export function useLoginForm() {
    const [user, setUser] = useLocalStorage(LocalStoredData.user);
    const [auth, setAuth] = useLocalStorage(LocalStoredData.auth)
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });




    const onSubmit = async (data: { email:string; password:string }) => {
        setIsLoading(true);
        let res =await api.post('/api/auth/login', data, {headers:{"Content-Type":"application/json"}})
        console.log(res)
        if( (res instanceof  ApiClientError )|| !res.data.ok && !res.data.id){

            // @ts-ignore
            toast({
                title: String(res.status),
                // @ts-ignore
                description: res.message || "UNKNOWN SERVER ERROR" ,
                variant: 'destructive'
            });
        }
        else {
            const loginResData =res.data as unknown as IloginResponseData
            try {
                const {auth, user} = handleSigninResponse(loginResData)
                setUser(user)
                setAuth(auth)
               Auth.getInstance(auth)

            }
            catch (e){
                throw e
            }





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
        setIsLoading(false);
    };

    return { form, onSubmit, isLoading };
}
