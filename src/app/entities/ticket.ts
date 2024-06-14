import Iticket from "@/declarations/tickets";
import IAttachment from "@/declarations/attachment";
import ITask from "@/declarations/task";
import {Iuser} from "@/declarations/users";
import api from "@/lib/ApiClient";
import {handleApiResponse} from "@/lib/ApiClient/utils";

export default class Ticket implements Iticket {
    constructor(data:{attachments: IAttachment[], content: string, id: string, tasks: ITask[], title: string}) {
        this.attachments = data.attachments;
        this.content = data.content;
        this.id = data.id;
        this.tasks = data.tasks;
        this.title = data.title;
    }
    attachments: IAttachment[];
    content: string;
    id: string;
    tasks: ITask[];
    title: string;

    public static async Create (data:Iticket):Promise<Ticket> {
        const res = api.post('/api/tickets', data)
        const resData = await handleApiResponse<Iticket>(res)
        return new Ticket(resData)
    }

    public static async Update(data:Partial<Iticket>):Promise<Ticket> {
        const res = api.patch('/api/tickets', JSON.stringify(data))
        const resData = await handleApiResponse<Iticket>(res)
        return new Ticket(resData)
    }

    public static async getAll():Promise<Ticket[]> {
        const res = api.get('/api/tickets')
        const resData = await handleApiResponse<Iticket[]>(res)
        const tickets:Ticket[] =[]
        resData.forEach(d => tickets.push(new Ticket(d)))
        return tickets
    }

    public static async GetById(id: number | string):Promise<Ticket> {
        const res = api.get(`/api/tickets/${id}`)
        const resData = await handleApiResponse<Iticket>(res)
        return new Ticket(resData)
    }

    public static async Delete (id: number | string) {
        const res =  api.delete(`/api/tickets/${id}`)
         await handleApiResponse(res)
        // todo what shall this return?
    }

}