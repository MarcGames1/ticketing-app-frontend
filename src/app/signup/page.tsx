'use client'
// TODO send the following data: firstName, lastName, email, password, departmentID


import Image from "next/image";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {PasswordInput} from "@/components/ui/password-input";
import {Button} from "@/components/ui/button";
import {CgSpinnerTwoAlt} from "react-icons/cg";
import Link from "next/link";
import {useLoginForm} from "@/hooks/useLoginForm";

const SignUpPage = () =>{
    const { form, onSubmit, isLoading } = useLoginForm()

    return <>
        <div className={'flex flex-col items-center justify-items-center place-items-center '}>
            <Image src={'/brand/logo.png'} loading={'eager'} width={300} height={300} alt={'app logo'}/>
            <Form {...form}>
                <form method={'POST'} onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email@marweb.ro" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <PasswordInput placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <div className={'flex w-full flex-row items-center justify-between gap-5'}>
                        <Button disabled={isLoading} type="submit">
                            {isLoading ?
                                <span className={'animate-spin'}>
                            <CgSpinnerTwoAlt size={'1.5rem'} color={'currentColor'}/>
                </span> : <>Login</>}</Button>
                        <Link className={'link  hover:underline transition-all hover:text-purple-500'}
                              href={'/login'}>Login</Link>
                    </div>
                </form>
            </Form>
        </div>
    </>
}
export default SignUpPage