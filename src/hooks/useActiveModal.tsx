import { useState, useEffect, ReactNode } from "react";
import TicketDetailModal from "@/components/Modal/TicketDetailModal";
import UpdateTicketModal from "@/components/Modal/UpdateTicketModal";
import DeleteTicketModal from "@/components/Modal/DeleteTicketModal";

export enum ActiveModal {
    openTicketModal = "openTicketModal",
    updateModal = "updateModal",
    deleteModal = "deleteModal"
}

interface UseActiveModalProps {
    data: any;
    onConfirm?: () => void;
    onClose: () => void;
}

interface UseActiveModalReturn {
    currentModal: ReactNode;
    setActiveModal: (modal: ActiveModal) => void;
}

const useActiveModal = ({ data, onConfirm, onClose }: UseActiveModalProps): UseActiveModalReturn => {
    const [currentActiveModal, setCurrentActiveModal] = useState<ActiveModal>(ActiveModal.openTicketModal);

    const renderModal = () => {
        switch (currentActiveModal) {
            case ActiveModal.openTicketModal:
                return <TicketDetailModal data={data} close={onClose}
                                          switchToUpdate={()=>{setCurrentActiveModal(ActiveModal.updateModal)}}
                                          switchToDelete={()=>{setCurrentActiveModal(ActiveModal.deleteModal)}}/>;
            case ActiveModal.updateModal:
                if(onConfirm){
                    return <UpdateTicketModal data={data} onConfirm={onConfirm} close={onClose} />;
                }

            case ActiveModal.deleteModal:
                if(onConfirm){
                   return <DeleteTicketModal title={'Delete Ticket'}  onConfirm={onConfirm} onClose={onClose} />
                }

            default:
                return null;
        }
    };

    useEffect(() => {
        renderModal();
    }, [currentActiveModal, data, onConfirm, onClose]);

    return { currentModal: renderModal(), setActiveModal: setCurrentActiveModal };
};

export default useActiveModal;
