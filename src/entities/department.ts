import {Idepartment} from "@/declarations/deptartment";
import {handleApiResponse} from "@/lib/ApiClient/utils";
import api from "@/lib/ApiClient";


export default class Department implements Idepartment {
    constructor(data:{ name: string, id: number}) {
        this.id = data.id;
        this.name = data.name;
    }
    id: number;
    name: string;

    static async Create(name:string){
        const res = api.post('/api/departments', { name })
        const resData = await handleApiResponse<Idepartment>(res);
        return new Department(resData)
    }
    static async Update(data:Idepartment ) {
        const res = api.patch('/api/departments', JSON.stringify(data))
        const resData = await handleApiResponse<Idepartment>(res);
        return new Department(resData)
    }
    static async getAll():Promise<Department[]>{
        const res = api.get(`/api/departments`)
        const resData = await handleApiResponse<Idepartment[]>(res);
        const departments:Department[] = []
        resData.forEach(i => departments.push(new Department(i)))
        return departments
    }
    static async getById(id:number | string){
        const res = api.get(`/api/departments/${id}`)
        const resData = await handleApiResponse<Idepartment>(res);
        return new Department(resData)
    }
    static async delete(id:number | string){
        const res = api.get(`/api/departments/${id}`)
        const resData = await handleApiResponse<Idepartment>(res);
    }
}