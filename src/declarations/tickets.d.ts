import IAttachment from "@/declarations/attachment";
import ITask from "@/declarations/task";

export default interface ITicket {
    id:string,
    title:string,
    content:string,
    attachments:IAttachment[],
    tasks:ITask[]
}