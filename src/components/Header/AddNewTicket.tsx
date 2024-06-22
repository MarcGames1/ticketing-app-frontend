import Modal from "@/components/Modal";
import AddNewTaskModal from "@/components/Modal/AddNewTicket";
import useWindowSize from "@/hooks/useWindowSize";
import Image from "next/image";
import { useState } from "react";
import AddNewTicketModal from "@/components/Modal/AddNewTicket";

const AddNewTicket = () => {
    const [openTicketModal, setOpenTicketModal] = useState(false);
    const {width} = useWindowSize();

    return (
        <>
            {
                width > 768 ? (
                    <button className="btn btn__primary btn-lg" onClick={() => setOpenTicketModal(true)}>
                        + Add New Ticket
                    </button>
                ) : (
                    <button className="btn btn__primary px-5 flex justify-center items-center" onClick={() => setOpenTicketModal(true)}>
                        <Image src="/icon-add-task-mobile.svg" alt="plus icon" height={12} width={12} />
                    </button>
                )}
            <Modal show={openTicketModal} onClose={() => setOpenTicketModal(false)}>
                <AddNewTicketModal onClose={() => setOpenTicketModal(!openTicketModal)} />
            </Modal>
        </>
    )
}

export default AddNewTicket
