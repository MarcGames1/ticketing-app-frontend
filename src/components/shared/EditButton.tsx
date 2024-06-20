import Image from "next/image";
import { useRef, useState, MouseEventHandler } from "react";
import { motion } from "framer-motion";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Modal from "@/components/Modal";
import UpdateTicketModal from "@/components/Modal/UpdateTicketModal";
import DeleteTicketModal from "@/components/Modal/DeleteTicketModal";
import Ticket from "@/entities/ticket";
import Task from "@/entities/tasks";
import {instanceOf} from "prop-types";



interface EditButtonProps {
    type: 'ticket' | 'task';
    className?: string;
    onConfirm: () => void;
    switchToUpdate: () => void;
    switchToDelete: () => void;
    data: Ticket | Task
}

const EditButton: React.FC<EditButtonProps> = ({
                                                   type,
                                                   className = '',
                                                   onConfirm,
                                                   switchToUpdate,
                                                   switchToDelete,
                                                    data
                                               }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showUpdateTicketModal, setShowUpdateTicketModal] = useState(false);
    const [showDeleteTicketModal, setShowDeleteTicketModal] = useState(false)

    const [showUpdateTaskModal, setShowUpdateTaskModal] =useState(false)
    const [showDeleteTaskModal, setShowDeleteTaskModal] =useState(false)
    const menuRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(menuRef, () => setShowMenu(false));

    const menuVariations = {
        closed: {
            opacity: 0,
            transition: {
                duration: 0.2,
                ease: "easeInOut",
                delay: 0,
            }
        },
        open: {
            opacity: 1,
            transition: {
                duration: 0.2,
                ease: "easeInOut",
            }
        }
    }


    return (
        <div className="relative z-30">
            <button className="h-8 w-8" onClick={() => setShowMenu(!showMenu)}>
                <Image src="/icon-vertical-ellipsis.svg" alt="vertical ellipsis" height={16} width={4} />
            </button>
            <motion.div
                ref={menuRef}
                variants={menuVariations}
                initial="closed"
                animate={showMenu ? "open" : "closed"}
                className={`${className} flex flex-col items-start space-y-4 absolute body-lg rounded-lg p-4 w-48 shadow-main capitalize bg-white dark:bg-veryDarkGrey`}
            >
                { data instanceof Ticket ? (
                    <>
                        <button
                            className="text-mediumGrey"
                            onClick={() => switchToUpdate()}
                        >
                            Edit {type}
                        </button>

                        <button
                            className="text-mainRed"
                            onClick={() => switchToDelete()}
                        >
                            Delete {type}
                        </button>

                    </>
                ) : (
                    <>
                        <button
                            className="text-mediumGrey"
                            onClick={() => switchToUpdate()}
                        >
                            Edit {type}
                        </button>
                        <button
                            className="text-mainRed"
                            onClick={() => switchToDelete()}
                        >
                            Delete {type}
                        </button>
                    </>
                )}
            </motion.div>
        </div>
    );
}

export default EditButton;
