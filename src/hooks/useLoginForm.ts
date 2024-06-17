'use client'
import {useState, useContext, useEffect} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";




import {z} from "zod";
import {APIErrorResponse} from "@/declarations/Api";
import {Idepartment} from "@/declarations/deptartment";
import {EmployeeRole, Iuser} from "@/declarations/users"; // Assume FormSchema is exported from another file
import api, {ApiClientError} from "@/lib/ApiClient";
import useLocalStorage from "@/hooks/useLocalStorage";

export const FormSchema = z.object({
    email: z.string().email( {
        message: "Enter a valid email address",
    }),
    password: z.string().min(2, { message: "Password must have at least 6 caracters",}).max(50, { message: "Too Manny Caracters for a password don't worry about it no one will hack your account",})
})
export function useLoginForm() {
    const [user, setUser] = useLocalStorage("user");
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
            const userDetails =res.data as unknown as Iuser
            try {
                console.log("Writing in Local Storage?? ==> ")
                setUser(userDetails)

            }
            catch (e){
                throw e
            }

            console.table(userDetails)


           setTimeout(()=>{
               router.push('/')
           },300)
            toast({
                title: 'Logged in Successfully',
                description: `Welcome ${userDetails.lastName}`,
            });
        }
        setIsLoading(false);
        router.push('/');
    };

    return { form, onSubmit, isLoading };
}
