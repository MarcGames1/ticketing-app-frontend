import Iticket, {ITicketByStatus, TaskStatus} from "@/declarations/tickets";
import IAttachment from "@/declarations/attachment";
import ITask from "@/declarations/task";
import {handleApiResponse} from "@/lib/ApiClient/utils";
import api, {ApiClientError, ApiClientSuccess} from "@/lib/ApiClient";

export default class Ticket implements Iticket {
    constructor(data:{attachments: IAttachment[], content: string, id: string | number, tasks: ITask[], title: string, status:TaskStatus}) {
        this.attachments = data.attachments;
        this.content = data.content;
        this.id = data.id ;
        this.tasks = data.tasks;
        this.title = data.title;
        this.status = data.status
    }
    attachments: IAttachment[];
    content: string;
    id: string | number;
    tasks: ITask[];
    title: string;
    status :TaskStatus;

    public static async Create (data:Partial<Iticket>):Promise<Ticket> {
        const res = api.post('/api/tickets', data)
        const resData = await handleApiResponse<Partial<Iticket>>(res) as Iticket
        return new Ticket(resData)
    }

    public static async Update(data:Partial<Iticket>):Promise<Ticket> {
        console.log(data)
        const res =  api.patch<Object>('/api/tickets',data,{headers:{"Content-Type":"application/json"}})
        const resData = await handleApiResponse<Object>(res) as unknown as Iticket
        return new Ticket(resData)
    }
    public static async UpdateStatus(id:number | string, status :TaskStatus ):Promise<ApiClientSuccess<any> | ApiClientError> {
        return  await api.patch(`/api/tickets/${id}/changeStatus`,
            JSON.stringify({status}),
            {headers: {"Content-Type": 'application/json'}})
    }

    public static async getAll(status:TaskStatus | undefined = undefined): Promise<ITicketByStatus[]> {
        try {
            const res = api.get('/api/tickets');
            const resData = await handleApiResponse<{ status: TaskStatus, tickets: Iticket[] }[]>(res);

            const ticketsByStatus: ITicketByStatus[] = resData.map(group => ({
                status: group.status,
                tickets: group.tickets.map(ticketData => new Ticket(ticketData))
            }));
            {
             return ticketsByStatus;
            }

        } catch (error) {
            console.error('Failed to fetch tickets:', error);
            throw error;
        }
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
 public static filter (by:TaskStatus, allTicketsByStatus:ITicketByStatus[]){
     return allTicketsByStatus.filter(ticketsByStatus =>  by === ticketsByStatus.status )
 }
}