import {TaskStatus} from "@/declarations/tickets";
import {Iuser} from "@/declarations/users";

export default interface ITask {
    description:string,
    id: number
    status:TaskStatus,
    title:string
    user:Iuser
}