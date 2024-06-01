"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {PasswordInput} from "@/components/ui/password-input";
// import {postFormData} from './onSubmitFunctions'

import {useState} from "react";
import {CgSpinnerTwoAlt} from "react-icons/cg";
import {ActionType, Context} from "@/context";
import {useContext} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";
// import {ApiClientSuccess} from "@/utils/ApiClient";
const FormSchema = z.object({
    email: z.string().email( {
        message: "Enter a valid email address",
    }),
    password: z.string().min(6, { message: "Password must have at least 6 caracters",}).max(50, { message: "Too Manny Caracters for a password don't worry about it no one will hack your account",})
})

export function SignInForm() {

    const [isLoading, setIsLoading] = useState(false)
    const { state, dispatch } = useContext(Context);
    const router = useRouter()
    const { user } = state;
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password:""
        },
    })
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true)
        const dataToSend = JSON.stringify({...data})
        // const user : IUser | undefined = await postFormData(dataToSend, '/auth/login')
        // console.log(user)
        if(!user)
        {
            setIsLoading(false)
            form.reset();
            toast( {
                variant:'destructive',
                title:'Eroare Server',
                description:"Incearca mai tarziu"
            })
            return
        }
        // TODO Change to react-tostify
        toast({
            title:'Logged Successfully',
            description:(<>
                <p>{user.email}</p>
            </>)
        })

        dispatch({ type: ActionType.LOGIN, payload: {user} });
        // localStorage.setItem('user', user.id)
        form.reset();
        setIsLoading(false)
        router.push('/');
    }
    return (
        <div className={'flex flex-col items-center justify-items-center place-items-center '}>
            <Image src={'/brand/logo.png'} width={500} height={500} alt={'app logo'} />
            <Form {...form}>
                <form method={'POST'} onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email@marweb.ro" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <PasswordInput  placeholder="password" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <Button disabled={isLoading}  type="submit">{isLoading ? <span className={'animate-spin'}><CgSpinnerTwoAlt  size={'1.5rem'} color={'currentColor'} />
                </span> : <>Login</>}</Button>
                </form>
            </Form>
        </div>
    )
}
