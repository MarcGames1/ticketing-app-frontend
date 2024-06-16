import Ticket from "@/entities/ticket";
import {TaskStatus, ITicketByStatus} from "@/declarations/tickets";
import {useEffect, useState} from "react";


const useTicketsByStatus =  (status?: TaskStatus) => {
    const [allTickets, setAllTickets] = useState<ITicketByStatus[]>([])
    useEffect(() => {
        const getAllTickets = async () :Promise<ITicketByStatus[]> =>{
           return  await Ticket.getAll()

        }
        getAllTickets().then(tickets => setAllTickets(tickets))
    }, [allTickets]);
    const ticketAndStatus = allTickets.find(t =>t.status=== status)
    if(ticketAndStatus) {
        return [ticketAndStatus]
    }
    else return allTickets

}
export default useTicketsByStatus