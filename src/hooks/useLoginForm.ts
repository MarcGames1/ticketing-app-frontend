'use client'
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";


import {z} from "zod";
import useLocalStorage,  {LocalStoredData} from "@/hooks/useLocalStorage";
import {handleSigninResponse} from "@/lib/utils";

import Auth from "@/entities/Auth";
import Actions from "@/ActionHandlers/Actions";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {useUserContext} from "@/context/UserContext";
import auth from "@/entities/Auth";

export const FormSchema = z.object({
    email: z.string().email( {
        message: "Enter a valid email address",
    }),
    password: z.string().min(2, { message: "Password must have at least 6 caracters",}).max(50, { message: "Too Manny Caracters for a password don't worry about it no one will hack your account",})
})
export function useLoginForm() {
    const {user, setUser } = useUserContext()
    const [value, setValue] = useLocalStorage<Auth>(LocalStoredData.auth)
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    useEffect(() => {
        console.log("Auth Status Changed! ", auth)
    }, [value]);


    const onSubmit = async (data: { email:string; password:string }) => {
        console.log("ON SUBMIT")
        setIsLoading(true);
       const loginResData = await Actions.Login(data)
        try {
            const {auth, user} = handleSigninResponse(loginResData)
            setUser(user)
            const authInstance = Auth.getInstance(auth)
            console.log(authInstance)
            setValue(authInstance)
            Auth.getInstance(auth)
            Actions.checkUser(user, router)
        }
        catch (e){
            throw e
        }


        setIsLoading(false);
    };

    return { form, onSubmit, isLoading };
}
