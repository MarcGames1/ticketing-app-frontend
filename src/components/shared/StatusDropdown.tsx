import { FC, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { TaskStatus } from '@/declarations/tickets';

// Define the types for the component props
interface StatusDropdownProps {
    label?: string;
    data: { id: string; status: TaskStatus };
    status: TaskStatus;
    setStatus: (status: TaskStatus) => void;
}

const StatusDropdown: FC<StatusDropdownProps> = ({ label = 'Status', data, status, setStatus }) => {
    const [showMenu, setShowMenu] = useState(false);
    const taskStatuses = [TaskStatus.Completed, TaskStatus.Pending, TaskStatus.InProgress];
    const [selectedTaskStatus, setSelectedTaskStatus] = useState(data.status)

    const menuVariants: Variants = {
        closed: {
            opacity: 0,
            y: -10,
            pointerEvents: 'none',
        },
        open: {
            opacity: 1,
            y: 0,
            pointerEvents: 'auto',
        },
    };

    return (
        <>
            <h3 className="mt-6 mb-2 body-md text-mediumGrey dark:text-white">{label}</h3>
            <div className="relative">
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    type="button"
                    className="inline-flex justify-between items-center w-full rounded-md outline outline-1 outline-lightGreyLine shadow-sm px-4 py-2 bg-white text-sm font-medium text-black focus:outline-mainPurple dark:bg-darkGrey dark:text-white dark:outline-darkGreyLine"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                >
                    {selectedTaskStatus}
                    <svg
                        className="-mr-1 ml-2 h-5 w-5 fill-mainPurple"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <motion.div
                    className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white focus:outline-none dark:bg-veryDarkGrey"
                    variants={menuVariants}
                    initial="closed"
                    animate={showMenu ? 'open' : 'closed'}
                >
                    <div className="py-1">
                        {taskStatuses.map((taskStatus, i) => (
                            <a
                                key={i}
                                onClick={() => {
                                    setStatus(taskStatus);
                                    setSelectedTaskStatus(taskStatus)
                                    setShowMenu(false);
                                }}
                                className="text-mediumGrey block px-4 py-2 text-sm hover:text-mainPurple hover:bg-mainPurple dark:hover:bg-white hover:bg-opacity-10 dark:hover:bg-opacity-10"
                            >
                                {taskStatus}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default StatusDropdown;
