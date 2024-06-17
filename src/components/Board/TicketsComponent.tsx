import {forwardRef, useState} from "react";
import {Draggable, DraggableId} from "react-beautiful-dnd";
import Ticket from "@/entities/ticket";
import {TaskStatus} from "@/declarations/tickets";
import Modal from "../Modal";
import TicketDetailModal from "@/components/Modal/TicketDetailModal";
import UpdateTicketModal from "@/components/Modal/UpdateTicketModal";
import DeleteTaskModal from "@/components/Modal/DeleteTaskModal";

interface TicketComponentProps {data:Ticket, index:number}

// eslint-disable-next-line react/display-name
const TicketsComponent = forwardRef<HTMLDivElement, TicketComponentProps>(({ data, index, ...props }, ref) => {
    console.log(data)
    const [openTaskModal, setOpenTaskModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    // const completedSubtasks = data.reduce((acc, subtask) => subtask.status === TaskStatus.Completed ? acc + 1 : acc, 0);

    //number of completed subtasks
    const completedTasks = data.tasks.reduce((acc, subtask) => subtask.status === TaskStatus.Completed ? acc + 1 : acc, 0);
    return (
        <div ref={ref} {...props}>
            <>
                <li className="group select-none shadow-main px-4 py-6 rounded-lg cursor-pointer bg-white text-black dark:bg-darkGrey dark:text-white"

                    onClick={() => setOpenTaskModal(true)}>
                    <h4 className="heading-md mb-2 group-hover:text-mainPurple">{data.title}</h4>
                    <p className="body-md text-mediumGrey"> {completedTasks} of {data.tasks.length} tasks
                        completed</p>
                    <p className="body-md text-mediumGrey"><span className={'body-lg'}>Attachments: </span>{data.attachments.length}</p>
                    <p className={'body-md text-mediumGrey'}>{data.content}</p>
                </li>
                <Modal show={openTaskModal} onClose={() => setOpenTaskModal(false)}>
                    <h1>Ticket Detail Modal</h1>
                    {/*<TicketDetailModal*/}
                    {/*    data={data}*/}
                    {/*    completedSubtasks={completedSubtasks}*/}
                    {/*    close={() => setOpenTaskModal(false)}*/}
                    {/*    switchToUpdate={() => {*/}
                    {/*        setOpenTaskModal(false);*/}
                    {/*        setUpdateModal(true);*/}
                    {/*    }}*/}
                    {/*    switchToDelete={() => {*/}
                    {/*        setOpenTaskModal(false);*/}
                    {/*        setDeleteModal(true);*/}
                    {/*    }} />*/}
                </Modal>
                <Modal show={updateModal} onClose={() => setUpdateModal(!updateModal)}>
                    <h1>Update Ticket Modal</h1>
                    {/*<UpdateTicketModal data={data} close={() => setUpdateModal(false)}/>*/}
                </Modal>
                <Modal show={deleteModal} onClose={() => setDeleteModal(!deleteModal)}>
                    <h1>Delete Ticket Modal</h1>
                    {/*<DeleteTaskModal*/}
                    {/*    title={data.title}*/}
                    {/*    onClose={() => {*/}
                    {/*        setDeleteModal(false);*/}
                    {/*        setOpenTaskModal(true);*/}
                    {/*    }}*/}
                    {/*    onConfirm={() => {*/}
                    {/*        // deleteTask(data.id) TODO*/}
                    {/*        setDeleteModal(false);*/}
                    {/*    }}/>*/}
                    {/*<></>*/}
                </Modal>
            </>
        </div>

    )
})
export default TicketsComponent
