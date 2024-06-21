// app/context/TicketsContext.tsx

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Ticket from "@/entities/ticket";
import { ITicketByStatus, TaskStatus } from "@/declarations/tickets";

interface TicketsContextProps {
    allTickets: ITicketByStatus[];
    isDataUpdated: boolean;
    setIsDataUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    setAllTickets: React.Dispatch<React.SetStateAction<ITicketByStatus[]>>;
    getTicketsByStatus: (status?: TaskStatus) => ITicketByStatus[];


}

const TicketsContext = createContext<TicketsContextProps | undefined>(undefined);

const TicketsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [allTickets, setAllTickets] = useState<ITicketByStatus[]>([]);
    const [isDataUpdated, setIsDataUpdated] = useState(true);

    useEffect(() => {
        const getAllTickets = async (): Promise<ITicketByStatus[]> => {
            return await Ticket.getAll();
        };
        getAllTickets().then((tickets) => setAllTickets(tickets));
        setIsDataUpdated(true);
    }, [isDataUpdated]);

    const getTicketsByStatus = (status?: TaskStatus): ITicketByStatus[] => {
        return status ? Ticket.filter(status, allTickets) : allTickets;
    };

    return (
        <TicketsContext.Provider
            value={{ allTickets, isDataUpdated, setIsDataUpdated, setAllTickets, getTicketsByStatus }}
        >
            {children}
        </TicketsContext.Provider>
    );
};

const useTickets = (): TicketsContextProps => {
    const context = useContext(TicketsContext);
    if (!context) {
        throw new Error("useTickets must be used within a TicketsProvider");
    }
    return context;
};

export { TicketsProvider, useTickets };
