import {Idepartment} from "@/declarations/deptartment";
import {handleApiResponse} from "@/lib/ApiClient/utils";
import api, {ApiClientError, ApiClientSuccess} from "@/lib/ApiClient";


export default class Department implements Idepartment {
    constructor(data:{ name: string, id: number}) {
        this.id = data.id;
        this.name = data.name;
    }
    id: number;
    name: string;

    static async Create(name:string){
        const res:Promise<ApiClientSuccess<Partial<Idepartment>> | ApiClientError> = api.post<Partial<Idepartment>>('/api/departments', {name})
        const resData :Idepartment = await handleApiResponse(res) as Idepartment
        return new Department(resData)
    }
    static async Update(data:Idepartment ) {
        const res : Promise<ApiClientSuccess<Idepartment> | ApiClientError> = api.patch<Idepartment>('/api/departments', data)
        const resData: Idepartment = await handleApiResponse<Idepartment>(res) ;
        return new Department(resData)
    }
    static async getAll():Promise<Department[]>{
        const res = api.get(`/api/departments`)
        const resData :Idepartment[] = await handleApiResponse<Idepartment[]>(res);
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