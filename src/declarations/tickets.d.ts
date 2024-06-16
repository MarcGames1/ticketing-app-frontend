import IAttachment from "@/declarations/attachment";
import ITask from "@/declarations/task";
import Ticket from "@/entities/ticket";
export enum TaskStatus {
    Pending,
    InProgress,
    Completed
}
export default interface ITicket {
    id:string,
    status:TaskStatus,
    title:string,
    content:string,
    attachments:IAttachment[],
    tasks:ITask[]
}

export interface ITicketByStatus {
status:TaskStatus;
tickets:Ticket[]
}
