'use client'
// TODO send the following data: firstName, lastName, email, password, departmentID
import {cn} from "@/lib/utils";
import {v4 as uuidv4} from 'uuid';
import Image from "next/image";
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem,} from "@/components/ui/command"
import {Input} from "@/components/ui/input";
import {PasswordInput} from "@/components/ui/password-input";
import {Button} from "@/components/ui/button";
import {CgSpinnerTwoAlt} from "react-icons/cg";
import Link from "next/link";
import {useRegisterForm} from "@/app/signup/useRegisterForm";
import { ChevronsUpDown} from "lucide-react";


const SignUpPage = () =>{
    const { form, onSubmit, isLoading, departments } = useRegisterForm()

    return <>
        <section className={'w-screen'}>
            <div className={'w-full h-screen  flex flex-row items-center justify-items-center justify-around place-items-center '}>
                <Image src={'/brand/logo.png'} loading={'eager'} width={300} height={300} alt={'app logo'}/>
                <Form {...form}>
                    <form method={'POST'} onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 drop-shadow-2xl border-mainPurple rounded-2xl ">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="firstName" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="lastName" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

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
                        <FormField
                            name="role"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Department</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        'w-[200px] justify-between',
                                                        !field.value && 'text-muted-foreground'
                                                    )}
                                                >
                                                    {field.value
                                                        ? departments.find((d) => d.name === field.value)
                                                            ?.name
                                                        : 'Select department'}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search Department..." />
                                                <CommandEmpty>No departments found.</CommandEmpty>
                                                <CommandGroup>
                                                    {departments.map((d) => (
                                                        <CommandItem
                                                            value={String(d.id)}
                                                            key={uuidv4() + d.id}
                                                            onSelect={() => {
                                                                form.setValue('departmentId', String(d.id));
                                                            }}
                                                        >
                                                            {d.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>User Department</FormDescription>
                                    <FormMessage />
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
        </section>
    </>
}
export default SignUpPage