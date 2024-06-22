import {TaskStatus} from "@/declarations/tickets";
import {Iuser} from "@/declarations/users";
import {DataType} from "csstype";
import Attachment = DataType.Attachment;
import IAttachment from "@/declarations/attachment";

export default interface ITask {
    attachments?: IAttachment[];
    description:string,
    id: number
    status:TaskStatus,
    title:string
    user:Iuser
}