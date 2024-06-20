import {forwardRef, useState} from "react";
import Ticket from "@/entities/ticket";
import Modal from "../Modal";

import useActiveModal from "@/hooks/useActiveModal";

interface TicketComponentProps {data:Ticket, index:number}

enum ActiveModal{
    openTicketModal="openTicketModal",
    updateModal="updateModal",
    deleteModal="deleteModal"
}
// eslint-disable-next-line react/display-name
const TicketsComponent = forwardRef<HTMLDivElement, TicketComponentProps>(({ data, index, ...props }, ref) => {
    const [state, setState] = useState(ActiveModal.openTicketModal)
    const { currentModal, setActiveModal } = useActiveModal({
        data,
        onConfirm: () => console.log("Confirm action"),
        onClose: () => {
            setOpenTicketModal(false)
            setActiveModal(ActiveModal.openTicketModal)
        }
    });
    const [openTicketModal, setOpenTicketModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    // const [activeModal, setActiveModal] = useState(ActiveModal.openTicketModal)

    function handleTaskModalClose() {
        if(!updateModal || !deleteModal){
            setOpenTicketModal(false)
            setActiveModal(ActiveModal.openTicketModal)

        }

    }

    //number of completed subtasks
    return (
        <div ref={ref} {...props}>
            <>
                <li className="group select-none shadow-main px-4 py-6 rounded-lg cursor-pointer bg-white text-black dark:bg-darkGrey dark:text-white"

                    onClick={() => setOpenTicketModal(true)}>
                    <h4 className="heading-md mb-2 group-hover:text-mainPurple">{data.title}</h4>
                    <p className={'body-md text-mediumGrey'}>{data.content}</p>
                </li>
                <Modal show={openTicketModal} onClose={handleTaskModalClose}>

                    {currentModal}
                </Modal>
            </>
        </div>

    )
})
export default TicketsComponent
