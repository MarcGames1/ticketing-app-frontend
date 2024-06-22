'use client'
import Button from "@/components/shared/Button"
import TextInput from "@/components/shared/TextInput";
import * as Yup from 'yup';

import Ticket from "@/entities/ticket";
import TextInputArea from "@/components/shared/TextInputArea";
import {useTickets} from "@/context/TicketsContext";
import {toast} from "@/components/ui/use-toast";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ITicket from "@/declarations/tickets";

const AddNewTicketModal = ({onClose}:{onClose:any}) => {
    const {
        setIsDataUpdated,
    } = useTickets();
    const validate = Yup.object({
        name: Yup.string().required("Can't be empty"),

        content: Yup.string()
    })



    return (
        <Formik
            initialValues={{
                title: "",
                content: "",
            }}
            validationSchema={validate}
            onSubmit={  async (values:{title:string, content:string}, {setSubmitting}) => {
                setSubmitting(true)
                const {title, content} = values
                let t :Ticket
                try {
                    console.log('Creating Ticket using', values)
                     await Ticket.Create({title, content});

                } catch (error) {
                    console.error("Failed to create ticket:", error);
                } finally {
                    toast({title:`Ticket Created`,})
                    setIsDataUpdated(false);
                    setSubmitting(false)
                    onClose();  // Close modal after operation
                     // Reset submission state
                }
            }}
        >
            { (formik) => (
                <div className="w-full mx-auto rounded-md p-6 bg-white dark:bg-darkGrey md:p-8">
                    <h1 className="heading-lg mb-6">Add New Ticket: {formik.values.title}</h1>
                    <Form>
                        <TextInput label="Ticket Name" name="title" type="text" placeholder="e.g. Web Design" />

                        <TextInputArea label={"content"} placeholder="Ticket Summary..."  name='content'/>

                        <Button
                            type="submit"
                            loading={formik.isSubmitting}
                            disabled={formik.isSubmitting}
                            className="mt-6 w-full bg-mainPurple text-white text-base rounded-full p-2 transition duration-200 hover:bg-mainPurpleHover">^ Save Changes</Button>

                    </Form>
                </div>
            )}
        </Formik>
    )
}
export default AddNewTicketModal
