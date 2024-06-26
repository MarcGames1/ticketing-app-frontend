'use client'
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {handleSigninResponse} from "@/lib/utils";
import Auth from "@/entities/Auth";
import Actions from "@/ActionHandlers/Actions";
import {useUserContext} from "@/context/UserContext";

export const FormSchema = z.object({
    email: z.string().email( {
        message: "Enter a valid email address",
    }),
    password: z.string().min(2)
})
export function useLoginForm() {
    const {user, setUser } = useUserContext()
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });



    const onSubmit = async (data: { email:string; password:string }) => {
        console.log("ON SUBMIT")
        setIsLoading(true);
       const loginResData = await Actions.Login(data)
        try {
            const {auth, user} = handleSigninResponse(loginResData)
            setUser(user)
            Auth.setInstanceValues(auth)

        }
        catch (e){
            throw e
        }


        setIsLoading(false);
    };

    return { form, onSubmit, isLoading };
}
