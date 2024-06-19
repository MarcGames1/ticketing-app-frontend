import Ticket from "@/entities/ticket";
import {ITicketByStatus, TaskStatus} from "@/declarations/tickets";
import {useEffect, useState} from "react";
import useLocalStorage from "@/hooks/useLocalStorage";


const useTicketsByStatus =  (status?: TaskStatus, isDataRefreshed=true) => {
    const [allTickets, setAllTickets] = useState<ITicketByStatus[]>([])
    const [isDataUpdated, setIsDataUpdated] = useState(isDataRefreshed)



    useEffect(() => {
        const getAllTickets = async () :Promise<ITicketByStatus[]> =>{
            return await Ticket.getAll()
        }
        getAllTickets().then(tickets => setAllTickets(tickets))
        setIsDataUpdated(true)
    }, [isDataUpdated]);
    if(status){
        return [ Ticket.filter(status, allTickets), setIsDataUpdated, setAllTickets]  as const;
    }

    else return [allTickets, setIsDataUpdated, setAllTickets]  as const;

}
export default useTicketsByStatus