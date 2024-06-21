import EditButton from "@/components/shared/EditButton";
import StatusDropdown from "@/components/shared/StatusDropdown";
import Ticket from "@/entities/ticket";
import Actions from "@/ActionHandlers/Actions";
import {TaskStatus} from "@/declarations/tickets";
import {useEffect, useState} from "react";
import {useTickets} from "@/context/TicketsContext";

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
            {/*<h3 className="mt-6 mb-4 body-md text-mediumGrey dark:text-white">*/}
            {/*    Subtasks ({completedSubtasks} of {data.tasks.length})*/}
            {/*</h3>*/}
            {
                data.tasks.map((subtask, i) => (
                    <label key={i} htmlFor={`${subtask}-${i}`} className={`body-md p-3 mb-2 inline-flex w-full rounded transition bg-lightGrey cursor-pointer hover:bg-mainPurple hover:bg-opacity-25 dark:text-white dark:bg-veryDarkGrey dark:hover:bg-mainPurple dark:hover:bg-opacity-25`}>
                        <input
                            id={`${subtask}-${i}`}
                            type="checkbox"
                            checked={subtask.status === TaskStatus.Completed}
                            className="mr-3 accent-mainPurple"
                            onChange={() => console.log('Change Task Status')}
                        />
                        <span className={`${subtask.status === TaskStatus.Completed ? "opacity-50 line-through" : "opacity-100"} transition`}>{subtask.title}</span>
                    </label>
                ))
            }

            <StatusDropdown label="Current Status" status={data.status}
                            data={{status:data.status, id:String(data.id)}}
                            setStatus={changeStatusHandler}
            />

        </div>
    )
}
export default TicketDetailModal
