import ITask from "@/declarations/task";
import Iticket, {TaskStatus} from "@/declarations/tickets";
import api from "@/lib/ApiClient";
import {handleApiResponse} from "@/lib/ApiClient/utils";

import {Iuser} from "@/declarations/users";
import User from './user'
import IAttachment from "@/declarations/attachment";
class Task implements ITask {

    description: string;
    id: number;
    status: TaskStatus;
    title: string;
    user: Iuser;
    attachments?: IAttachment[]

    constructor(data:ITask) {
        this.id = data.id
        this.description = data.description
        this.status = data.status
        this.title = data.title
        this.user = new User(data.user)
        this.attachments = data.attachments
    }

    public static async Create (data:ITask):Promise<Task> {
        const res = api.post('/api/tasks', data)
        const resData = await handleApiResponse<ITask>(res)
        return new Task(resData)
    }

    public static async Update(data:Partial<ITask>):Promise<Task> {
        const res = api.patch<Partial<ITask>>('/api/tasks', data)
        const resData:ITask = await handleApiResponse<Partial<ITask>>(res) as ITask
        return new Task(resData)
    }

    public static async getAll():Promise<Task[]> {
        const res = api.get('/api/tasks')
        const resData = await handleApiResponse<ITask[]>(res)
        const tasks:Task[] =[]
        resData.forEach(d => tasks.push(new Task(d)))
        return tasks
    }

    public static async GetById(id: number | string):Promise<Task> {
        const res = api.get(`/api/tasks/${id}`, {
            headers: {
                // "Content-Type": "application/json",
                // 'Access-Control-Allow-Origin': 'http://localhost:3000',
            }})
        const resData = await handleApiResponse<ITask>(res)
        return new Task(resData)
    }

    public static async Delete (id: number | string) {
        const res =  api.delete(`/api/tasks/${id}`)
        await handleApiResponse(res)
        // todo what shall this return?
    }


}

export default Task