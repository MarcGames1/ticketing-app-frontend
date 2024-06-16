import {useState} from "react";
import {Draggable} from "react-beautiful-dnd";
import Ticket from "@/entities/ticket";
import {TaskStatus} from "@/declarations/tickets";
import Modal from "../Modal";
import TaskDetailModal from "@/components/Modal/TaskDetailModal";


const TaskComponent = ({ data, index }:{data:Ticket, index:number}) => {
    console.log(data)
    const [openTaskModal, setOpenTaskModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    // const completedSubtasks = data.reduce((acc, subtask) => subtask.status === TaskStatus.Completed ? acc + 1 : acc, 0);

    //number of completed subtasks
    const completedSubtasks = data.tasks.reduce((acc, subtask) => subtask.status === TaskStatus.Completed ? acc + 1 : acc, 0);
    return (
        <Draggable draggableId={String(data.id)} index={index} >
            {(provided) => (
                <>
                    <li className="group select-none shadow-main px-4 py-6 rounded-lg cursor-pointer bg-white text-black dark:bg-darkGrey dark:text-white"
                        {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                        onClick={() => setOpenTaskModal(true)}>
                        <h4 className="heading-md mb-2 group-hover:text-mainPurple">{data.title}</h4>
                        <p className="body-md text-mediumGrey"> {completedSubtasks} of {data.tasks.length} tasks
                            completed</p>
                        <p className="body-md text-mediumGrey"><span className={'body-lg'}>Attachments: </span>{data.attachments.length}</p>
                        <p className={'body-md text-mediumGrey'}>{data.content}</p>
                    </li>
                    <Modal show={openTaskModal} onClose={() => setOpenTaskModal(false)}>
                        <TaskDetailModal
                            data={data}
                            completedSubtasks={completedSubtasks}
                            // close={() => setOpenTaskModal(false)}
                            switchToUpdate={() => {
                                setOpenTaskModal(false);
                                setUpdateModal(true);
                            }}
                            switchToDelete={() => {
                                setOpenTaskModal(false);
                                setDeleteModal(true);
                            }} />
                    </Modal>
                    {/*<Modal show={updateModal} onClose={() => setUpdateModal(!updateModal)}>*/}
                    {/*    <UpdateTaskModal data={data} close={() => setUpdateModal(false)}/>*/}
                    {/*</Modal>*/}
                    {/*<Modal show={deleteModal} onClose={() => setDeleteModal(!deleteModal)}>*/}
                    {/*    <DeleteTaskModal*/}
                    {/*        title={data.title}*/}
                    {/*        onClose={() => {*/}
                    {/*            setDeleteModal(false);*/}
                    {/*            setOpenTaskModal(true);*/}
                    {/*        }}*/}
                    {/*        onConfirm={() => {*/}
                    {/*            deleteTask(data.id)*/}
                    {/*            setDeleteModal(false);*/}
                    {/*        }}/>*/}
                        <></>
                    </Modal>
                </>
            )}
        </Draggable>
    )
}
export default TaskComponent
