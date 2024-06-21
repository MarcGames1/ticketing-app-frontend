'use client'
import Button from "@/components/shared/Button"
import TextInput from "@/components/shared/TextInput";
import { FieldArray, Form, Formik } from "formik"
import * as Yup from 'yup';

import Ticket from "@/entities/ticket";
import TextInputArea from "@/components/shared/TextInputArea";
import {useTickets} from "@/context/TicketsContext";
import {toast} from "@/components/ui/use-toast";

const AddNewTicketModal = ({onClose}:{onClose:any}) => {
    const {allTickets, setIsDataUpdated, setAllTickets} = useTickets();
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
            onSubmit={  async (values, { setSubmitting }) => {
                let t :Ticket
                try {
                    console.log('Creating Ticket using', values)
                     await Ticket.Create(values);
                    setIsDataUpdated(false);  // Assuming this should trigger some re-fetch or update
                    onClose();  // Close modal after operation
                } catch (error) {
                    console.error("Failed to create ticket:", error);
                } finally {
                    toast({title:`Ticket Created`,})
                    setSubmitting(false);  // Reset submission state
                }
            }}
        >
            { formik => (
                <div className="w-full mx-auto rounded-md p-6 bg-white dark:bg-darkGrey md:p-8">
                    <h1 className="heading-lg mb-6">Add New Ticket</h1>
                    <Form>
                        <TextInput label="Ticket Name" name="title" type="text" placeholder="e.g. Web Design" />

                        <label className="body-md capitalize text-mediumGrey dark:text-white mt-6 block">
                            Content
                        </label>
                        <TextInputArea label={"content"}  name={'content'}/>

                        <Button
                            type="submit"
                            className="mt-6 w-full bg-mainPurple text-white text-base rounded-full p-2 transition duration-200 hover:bg-mainPurpleHover">Save Changes</Button>

                    </Form>
                </div>
            )}
        </Formik>
    )
}
export default AddNewTicketModal
