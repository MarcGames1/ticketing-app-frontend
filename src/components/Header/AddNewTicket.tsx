import Modal from "@/components/Modal";
import AddNewTaskModal from "@/components/Modal/AddNewTicket";
import useWindowSize from "@/hooks/useWindowSize";
import Image from "next/image";
import { useState } from "react";

const AddNewTicket = () => {
    const [openTicketModal, setOpenTicketModal] = useState(false);
    const {width} = useWindowSize();

    return (
        <>
            {
                width > 768 ? (
                    <button className="btn btn__primary btn-lg" onClick={() => setOpenTicketModal(true)}>
                        + Add New Task
                    </button>
                ) : (
                    <button className="btn btn__primary px-5 flex justify-center items-center" onClick={() => setOpenTicketModal(true)}>
                        <Image src="/icon-add-task-mobile.svg" alt="plus icon" height={12} width={12} />
                    </button>
                )}
            <Modal show={openTicketModal} onClose={() => setOpenTicketModal(false)}>
                <AddNewTaskModal onClose={() => setOpenTicketModal(!openTicketModal)} />
            </Modal>
        </>
    )
}

export default AddNewTicket
