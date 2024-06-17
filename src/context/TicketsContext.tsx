import React, { createContext, useContext, useEffect, useState } from "react";

import Ticket from "@/entities/ticket";
import UseTicketsByStatus from "@/hooks/useTicketsByStatus";
import {ITicketByStatus} from '@/declarations/tickets'
import useTicketsByStatus from "@/hooks/useTicketsByStatus";

interface TicketsContextType {
    tickets: Ticket[];
    ticketsByStatus: ITicketByStatus[];
}

const TicketsContext = createContext<TicketsContextType>({
    tickets: [],
    ticketsByStatus:[]
});
export const useTickets = () => useContext(TicketsContext);

export const TicketsProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                             children,
                                                                         }) => {
    // const [tickets, setTickets] = useState<Ticket[]>([]);
    // const ticketsByStatus:ITicketByStatus[]  = useTicketsByStatus() ;
    // const [currentTicket, setCurrentTicket]


    return (
        <TicketsContext.Provider value={{
            ticketsByStatus,
            tickets,
             }}>
            {children}
        </TicketsContext.Provider>
    );
};