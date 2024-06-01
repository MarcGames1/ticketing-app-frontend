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


export const FormSchema = z.object({
    email: z.string().email( {
        message: "Enter a valid email address",
    }),
    password: z.string().min(2, { message: "Password must have at least 6 caracters",}).max(50, { message: "Too Manny Caracters for a password don't worry about it no one will hack your account",})
})
export function useLoginForm() {
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
        let res = undefined;
        const apiUrl = 'http://localhost:8080/api/auth/login'
        console.log(apiUrl)
        console.table(data)
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(data),
           // mode: "no-cors", // no-cors, *cors, same-origin
            headers:{
                'Content-Type': "application/json"
            }
        })
          const jsonRes = await response.json();
        if(!jsonRes.ok && !jsonRes.id){
            res = jsonRes  as unknown as APIErrorResponse;
            // @ts-ignore
            toast({
                title: res.title,
                // @ts-ignore
                description:  "UNKNOWN SERVER ERROR" ,
                variant: 'destructive'
            });
        } else {
            const userDetails =jsonRes as unknown as Iuser
            console.log(userDetails, "USER DETAILSSS")
            try {
                console.log("Writing in Local Storage?? ==> ")
                localStorage.setItem('user', JSON.stringify(userDetails))
            }
            catch (e){
                throw e
            }

            console.table(userDetails)


            router.push('/')
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
