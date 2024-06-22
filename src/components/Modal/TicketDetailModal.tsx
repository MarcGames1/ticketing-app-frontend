import EditButton from "@/components/shared/EditButton";
import StatusDropdown from "@/components/shared/StatusDropdown";
import Ticket from "@/entities/ticket";
import Actions from "@/ActionHandlers/Actions";
import {TaskStatus} from "@/declarations/tickets";
import {useEffect, useState} from "react";
import {useTickets} from "@/context/TicketsContext";
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { badgeVariants } from "@/components/ui/badge"
import api, {ApiClientError, ApiClientSuccess} from "@/lib/ApiClient";

import { MdDeleteForever } from "react-icons/md";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {Button} from "@/components/ui/button";
import {toast} from "@/components/ui/use-toast";
interface TicketModalProps {
    data:Ticket,
    close: () => void,
    switchToUpdate:() => void,
    switchToDelete :() => void,
}



const TicketDetailModal = ({ data, switchToUpdate, switchToDelete, close}:TicketModalProps) => {
   const {allTickets, setIsDataUpdated, setAllTickets} = useTickets()
    const [isUiUpdated, setIsUiUpdated] = useState(true)
    const changeStatusHandler = async (status:TaskStatus)=>{
  await   Actions.ChangeTicketStatus(status ,data.id)
        setIsDataUpdated(false)
        setIsUiUpdated(false)
 }

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
    useEffect(() => {
        setIsDataUpdated(isUiUpdated)
    }, [isUiUpdated]);
    return (
        <div className="w-full mx-auto rounded-md p-6 bg-white dark:bg-darkGrey md:p-8">
            <div className="flex items-center justify-between gap-4 mb-6">
                <h1 className="heading-lg">{data.title}</h1>
                <EditButton
                    switchToUpdate={switchToUpdate}
                    switchToDelete={switchToDelete}
                    data={data}
                    type="ticket"
                    className="bottom-0 left-0 -translate-x-2/4 translate-y-28" onConfirm={()=>{}}/>
            </div>
            <p className="body-lg text-mediumGrey">
                {data.content}
            </p>

            <Accordion type="single" collapsible>
            {
                data.tasks.map((task, i) => (

                    <AccordionItem key={i} value={String(task.id)}>
                        <AccordionTrigger>
                          <h2>{task.title}</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className={'flex flex-col items-center justify-items-center gap-3 overflow-y-scroll'}>
                                <p>{task.description}</p>
                                {task.attachments && task.attachments.map((attachment)=> <div
                                    className={'relative'}
                                    key={attachment.s3Id}>
                                    <Image key={attachment.s3Id} alt={attachment.s3Id} width={200}  height={200} src={attachment.url} />
                                    <Button onClick={()=>{deleteTaskAttachments(data.id, task.id, attachment.id)}} title={'Delete Image'} variant={'destructive'} className={'rounded-full bottom-0 right-0 absolute'}><MdDeleteForever /></Button>
                                </div>)  }
                                <div>
                                    <span>Controls</span>
                                    <br/>
                                    
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    // <label key={i} htmlFor={`${subtask}-${i}`} className={`body-md p-3 mb-2 inline-flex w-full rounded transition bg-lightGrey cursor-pointer hover:bg-mainPurple hover:bg-opacity-25 dark:text-white dark:bg-veryDarkGrey dark:hover:bg-mainPurple dark:hover:bg-opacity-25`}>
                    //     <input
                    //         id={`${subtask}-${i}`}
                    //         type="checkbox"
                    //         checked={subtask.status === TaskStatus.Completed}
                    //         className="mr-3 accent-mainPurple"
                    //         onChange={() => console.log('Change Task Status')}
                    //     />
                    //     <span className={`${subtask.status === TaskStatus.Completed ? "opacity-50 line-through" : "opacity-100"} transition`}>{subtask.title}</span>
                    // </label>
                ))

            }
                    </Accordion>
            <StatusDropdown label="Current Status" status={data.status}
                            data={{status:data.status, id:String(data.id)}}
                            setStatus={changeStatusHandler}
            />

        </div>
    )
}
export default TicketDetailModal
