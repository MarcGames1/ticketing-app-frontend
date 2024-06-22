import {FC, useState} from 'react';
import Button from '@/components/shared/Button';
import TextInput from '@/components/shared/TextInput';
import TextArea from '@/components/shared/TextInputArea';
import InputArray from '@/components/shared/InputArray';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import Tasks from "@/entities/tasks";
import Ticket from "@/entities/ticket";
import ITask from "@/declarations/task";
import ITicket, {TaskStatus} from "@/declarations/tickets";
import StatusDropdown from "@/components/shared/StatusDropdown";
import {useTickets} from "@/context/TicketsContext";
import {toast} from "@/components/ui/use-toast";


interface UpdateTicketModalProps {
    data: Ticket;
    close: () => void;
    onConfirm : () => void;
}

// Define the validation schema using Yup
const validate = Yup.object({
    title: Yup.string().required("Can't be empty"),
    description: Yup.string().required("Can't be empty"),
    subtasks: Yup.array().of(
        Yup.object({
            title: Yup.string().required("Can't be empty"),
        }),
    ),
    status: Yup.string().required("Can't be empty"),
});

// Define the component with TypeScript
const UpdateTicketModal: FC<UpdateTicketModalProps> = ({ data, close, onConfirm }) => {
   const {
       allTickets,
       isDataUpdated,
       setIsDataUpdated,
       setAllTickets,
       getTicketsByStatus
   } = useTickets()
    const [status, setStatus] = useState<string>(data.status);
    const [tasks, setTasks] = useState<Tasks[]>(data.tasks);
    const getTaskTitles = (tasks:ITask[]) =>{
        return tasks.map(t => {
            return {title: t.title}
        })
    }
    return (
        <Formik
            initialValues={{
    ...data,
            status: status,
    }}
    validationSchema={validate}
    onSubmit={async (values,{setSubmitting}) => {
        setSubmitting(true)
        values.status = status;
        const ticket =values as Partial<ITicket>
        await Ticket.Update(ticket);
        toast({title:"Ticket Updated! "})
        setIsDataUpdated(false)
        setSubmitting(false)
        close();
    }}
>
    {formik => (
        <div className="w-full mx-auto rounded-md p-6 bg-white dark:bg-darkGrey md:p-8">
        <h1 className="heading-lg mb-6">Edit Ticket</h1>
    <Form>
    <TextInput label="Title" name="title" type="text" placeholder="e.g. Take coffee break" />
    <TextArea label="Description" name="content" placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little." />
    <InputArray name={'Task Status'} label="tasks" array={getTaskTitles(formik.values.tasks)} />

    <Button disabled={formik.isSubmitting} type="submit"
            className="mt-6 w-full bg-mainPurple text-white text-base rounded-full p-2 transition duration-200 hover:bg-mainPurpleHover">Save Changes</Button>
    </Form>
    </div>
    )}
    </Formik>
);
};

export default UpdateTicketModal;
