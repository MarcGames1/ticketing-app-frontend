import { useEffect, useRef, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import useOnClickOutside from "@/hooks/useOnClickOutside";

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
}

const Modal = ({ show, onClose, children, className = 'items-center justify-center' }: ModalProps) => {
    const [isBrowser, setIsBrowser] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(modalRef, () => onClose());

    const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
        if ((e.charCode || e.keyCode) === 27) {
            onClose();
        }
    };

    useEffect(() => {
        setIsBrowser(true);
        document.body.addEventListener("keydown", closeOnEscapeKeyDown);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
        };
    }, []);

    const backdropVariant = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3,
            },
        },
    };

    const modalVariant = {
        hidden: {
            y: "-200px",
        },
        visible: {
            y: 0,
            transition: {
                duration: 0.25,
            },
        },
    };

    const modalContent = (
        <AnimatePresence>
            {show ? (
                <motion.div
                    variants={backdropVariant}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className={`modal fixed left-0 right-0 top-0 bottom-0 bg-opacity-50 flex bg-black z-50 ${className}`}
                >
                    <motion.div className="w-full m-4 max-w-[480px]" ref={modalRef} variants={modalVariant}>
                        {children}
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );

    if (isBrowser) {
        const modalRoot = document.querySelector("#modal");
        return modalRoot ? createPortal(modalContent, modalRoot) : null;
    } else {
        return null;
    }
};

export default Modal;
