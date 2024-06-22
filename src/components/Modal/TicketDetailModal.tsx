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
import TasksArray from "@/components/Modal/TasksArray";
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

            <TasksArray key={data.id} ticketId={data.id} tasks={data.tasks} />
            <StatusDropdown label="Current Status" status={data.status}
                            data={{status:data.status, id:String(data.id)}}
                            setStatus={changeStatusHandler}
            />

        </div>
    )
}
export default TicketDetailModal
