import Ticket from "@/entities/ticket";
import {ITicketByStatus, TaskStatus} from "@/declarations/tickets";
import {useEffect, useState} from "react";


const useTicketsByStatus =  (status?: TaskStatus) => {
    const [allTickets, setAllTickets] = useState<ITicketByStatus[]>([])
    const [isDataUpdated, setIsDataUpdated] = useState(false)
    useEffect(() => {
        const getAllTickets = async () :Promise<ITicketByStatus[]> =>{
           return  await Ticket.getAll()
        }
        getAllTickets().then(tickets => setAllTickets(tickets))
        setIsDataUpdated(true)
    }, [isDataUpdated]);
    if(status){
        return [ Ticket.filter(status, allTickets), setIsDataUpdated]  as const;
    }

    else return [allTickets, setIsDataUpdated]  as const;

}
export default useTicketsByStatus