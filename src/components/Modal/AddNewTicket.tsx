'use client'
import Button from "@/components/shared/Button"


import Ticket from "@/entities/ticket";

import {useTickets} from "@/context/TicketsContext";
import {toast} from "@/components/ui/use-toast";

import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea"
import {useState} from "react";

const AddNewTicketModal = ({onClose}:{onClose:any}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {
        setIsDataUpdated,
    } = useTickets();

    const formSchema = z.object({
        title: z.string().min(2, {
            message: "Title must be at least 2 characters.",
        }),
        content: z.string().min(2, {
            message: "Content must be at least 2 characters.",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content:""
        },
    })

    const onSubmitHandler =  () => {
        const values = form.getValues()
        const {title, content} = values
        setIsSubmitting(true)
        try {
            console.log('Creating Ticket using', values)
            Ticket.Create({title, content})
                .then(t => {
                    toast({title: `Ticket Created`, content: `${t.id}`})
                    setIsDataUpdated(false);
                })
                .catch(e =>{ console.error("Failed to create ticket:", e);})
                .finally(()=>{
                    setIsSubmitting(false)
                    onClose();  // Close modal after operation
                    form.reset()
                });

        } catch (error) {
            console.error("Failed to create ticket:", error);
        }

    }



    return (
        <div className="w-full mx-auto rounded-md p-6 bg-white dark:bg-darkGrey md:p-8">
            <h1 className="heading-lg mb-6">Add New Ticket</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ticket Title ... " {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Ticket Description" {...field} />
                                </FormControl>
                                <FormDescription>
                                   This Will be the ticket description
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={isSubmitting}
                        className="mt-6 w-full bg-mainPurple text-white text-base rounded-full p-2 transition duration-200 hover:bg-mainPurpleHover"
                        type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )


}
export default AddNewTicketModal
