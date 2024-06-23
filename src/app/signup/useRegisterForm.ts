'use client'
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {handleSigninResponse} from "@/lib/utils";
import Auth from "@/entities/Auth";
import Actions from "@/ActionHandlers/Actions";
import {useUserContext} from "@/context/UserContext";
import {Idepartment} from "@/declarations/deptartment";
import api from "@/lib/ApiClient";
import {handleApiResponse} from "@/lib/ApiClient/utils";
import {toast} from "@/components/ui/use-toast";
import {RegisterData} from "@/declarations/auth";





export function useRegisterForm() {
    const {user, setUser } = useUserContext()
    const [isLoading, setIsLoading] = useState(false);
    const [departments, setDepartments] = useState<Idepartment[]>([])


    useEffect(() => {
        Actions.getDepartments()
            .catch(e =>{toast({content:e, title:"Error getting Departments"})})
            .then(deps => {
                return  deps ? setDepartments(deps) : new Error("Cold not fetch departments")
            })
            .then(()=>{toast({title:"Listing Departments"})})
            .finally(()=>{setIsLoading(false)})

    }, [ departments]);
     const FormSchema = z.object({
        email: z.string().email( {
            message: "Enter a valid email address",
        }),
        password: z.string()
            .min(6, { message: "Password must have at least 6 caracters",})
            .max(50, { message: "Too Manny Caracters for a password don't worry about it no one will hack your account",})
            .regex(new RegExp("^(?=.[a-z])(?=.[A-Z])(?=.\\d)(?=.[@$!%?&])[A-Za-z\\d@$!%?&]{8,}$"), {message:"Password should Contain at least 1 number, 1 uppercase letter, 1 lowercase letter and 1 special caracter"}),
        department: z.string()
    })


    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            firstName:"",
            lastName:'',
            email: "",
            password: "",
            departmentId:'',
        }
    });



    const onSubmit = async (data: RegisterData) => {
        console.log("ON SUBMIT")
        setIsLoading(true);

        try {
            const registerData = await Actions.Register(data)

        }
        catch (e){
            throw e
        }


        setIsLoading(false);
    };

    return { form, onSubmit, isLoading };
}
