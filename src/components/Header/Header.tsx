'use client'
import useWindowSize from "@/hooks/useWindowSize";
import {useState} from "react";
import { useTheme } from "next-themes"
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Modal from "@/components/Modal";
import EditButton from "@/components/shared/EditButton";
import AddNewTicket from "@/components/Header/AddNewTicket";
import useAppState from "@/hooks/useAppState";
import {useAppStateContext} from "@/context/AppStateContext";


const Header = () =>{
    const {width} = useWindowSize();
    const [showMenu, setShowMenu] = useState(false);
    const {theme} = useTheme();
    const {appState} = useAppStateContext()

    return (
        <header className="p-4 h-[85px] flex bg-white justify-between items-center border-b border-lightGreyLine dark:bg-darkGrey dark:text-white dark:border-darkGreyLine md:p-0">
            <div className="flex items-center ">
                <AnimatePresence>
                    {
                        width <= 768 ? (
                            <>
                                <Image src="/logo-mobile.svg" alt="kanban logo" height={25} width={24}  />
                                <button className="flex justify-center items-center" onClick={() => setShowMenu(true)}>
                                    <h2 className="heading-lg ml-5 mr-2">{appState}</h2>
                                    {
                                        showMenu ? (
                                            <Image src="/brand/logo.png" alt="chevron" height={4} width={8} />
                                        ) :  (
                                            <Image src="/brand/logo.png" alt="chevron" height={4} width={8} />
                                        )
                                    }
                                </button>
                                <Modal
                                    show={showMenu}
                                    onClose={() => setShowMenu(!showMenu)}
                                    className={"align-start pt-20 px-12"}
                                >
                                    {/*<MobileBoardMenu />*/} <div>TODO mOBILE BOARD MENU</div>
                                </Modal>
                            </>
                        ) : (
                            <>
                                <div
                                    className="w-[260px] lg:w-[300px] p-8 box-border transition-all ease border-r border-r-lightGreyLine dark:border-r-darkGreyLine">
                                    <Image src={"/brand/logo.png"} alt="kanban logo" height={25} width={152}  />
                                </div>
                                <h2 className="heading-lg ml-5 mr-2">{appState || "No Board Found"}</h2>
                            </>
                        )
                    }
                </AnimatePresence>

            </div>
            <div className="flex items-center gap-4 md:pr-4">
                <AddNewTicket />
            </div>
        </header>
    )
}
export default Header