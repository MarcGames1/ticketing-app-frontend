import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {MdDeleteForever} from "react-icons/md";
import Task from "@/entities/tasks";
import ITask from "@/declarations/task";
import api from "@/lib/ApiClient";
import {toast} from "@/components/ui/use-toast";
import {useTickets} from "@/context/TicketsContext";
import {useEffect, useState} from "react";
import Link from "next/link";

interface TasksArrayProps {
    tasks:Task[] | ITask[]
    ticketId: string | number
}
const TasksArray = ({tasks, ticketId}:TasksArrayProps) =>{
    const {allTickets, setIsDataUpdated, setAllTickets} = useTickets()
    const [isUiUpdated, setIsUiUpdated] = useState(true)

    useEffect(() => {
        setIsDataUpdated(isUiUpdated)
    }, [isUiUpdated]);

    const deleteTaskAttachments = (ticketID: string | number, taskID: string | number, attachmentID: string | number) =>{
        ///api/tickets/1/tasks/1/attachments/8
        const res =  api.delete(`/api/tickets/${ticketID}/tasks/${taskID}/attachments/${attachmentID}`)
            .catch(e => {toast({variant: 'destructive', title:"Error Deleting File!", description:e})})
            .then(()=>{
                toast({title:"Attachment Deleted"})
                setIsUiUpdated(false)
            })

            .finally(
            )
    }

    return (
        <Accordion type="single" collapsible>
            {
                tasks.map((task, i) => (

                    <AccordionItem key={i} value={String(task.id)}>
                        <AccordionTrigger>
                            <h2>{task.title}</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className={'flex flex-col items-center justify-items-center gap-3 overflow-y-scroll'}>
                                <p>{task.description}</p>
                                {task.attachments && task.attachments.map((attachment) => <div
                                    className={'relative'}
                                    key={attachment.s3Id}>
                                    <Link className={'zoom-in-50'} href={attachment.url}><Image key={attachment.s3Id}
                                                                                                alt={attachment.s3Id}
                                                                                                width={200} height={200}
                                                                                                src={attachment.url}/></Link>
                                    <Button onClick={() => {
                                        deleteTaskAttachments(ticketId, task.id, attachment.id)
                                    }} title={'Delete Image'} variant={'destructive'}
                                            className={'rounded-full bottom-0 right-0 absolute'}><MdDeleteForever/></Button>
                                </div>)}
                                <div className={'w-full '}>
                                    <Button size={'lg'}
                                            className={'btn btn-lg w-full bg-mainPurple bg-opacity-10 text-mainPurple bold rounded-full p-2 pt-3 mt-3 transition duration-200 hover:bg-opacity-25 dark:bg-opacity-100 dark:bg-white'}>Edit
                                        Task</Button>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))
            }
        </Accordion>
    )
}
export default TasksArray