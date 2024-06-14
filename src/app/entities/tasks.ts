import ITask from "@/declarations/task";
import Iticket from "@/declarations/tickets";
import api from "@/lib/ApiClient";
import {handleApiResponse} from "@/lib/ApiClient/utils";

export default class Task implements ITask {
    constructor(data:ITask) {

    }

    public static async Create (data:ITask):Promise<Task> {
        const res = api.post('/api/tasks', data)
        const resData = await handleApiResponse<ITask>(res)
        return new Task(resData)
    }

    public static async Update(data:Partial<ITask>):Promise<Task> {
        const res = api.patch('/api/tasks', JSON.stringify(data))
        const resData = await handleApiResponse<ITask>(res)
        return new Task(resData)
    }

    public static async getAll():Promise<Task[]> {
        const res = api.get('/api/tasks')
        const resData = await handleApiResponse<Iticket[]>(res)
        const tasks:Task[] =[]
        resData.forEach(d => tasks.push(new Task(d)))
        return tasks
    }

    public static async GetById(id: number | string):Promise<Task> {
        const res = api.get(`/api/tasks/${id}`)
        const resData = await handleApiResponse<Iticket>(res)
        return new Task(resData)
    }

    public static async Delete (id: number | string) {
        const res =  api.delete(`/api/tasks/${id}`)
        await handleApiResponse(res)
        // todo what shall this return?
    }

}