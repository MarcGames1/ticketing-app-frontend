import {EmployeeRole, Iuser} from "@/declarations/users";
import {Idepartment} from "@/declarations/deptartment";
import api from "@/lib/ApiClient";
import {handleApiResponse} from "@/lib/ApiClient/utils";

export default class User implements Iuser{
    constructor(data:Iuser) {
        this.department = data?.department;
        this.email = data.email;
        this.firstName = data.firstName;
        this.id = data.id;
        this.lastName = data.lastName;
        this.role = data.role;
    }
    department?: Idepartment;
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    role: EmployeeRole;

    public static async Create (data: {data:Partial<Iuser>}):Promise<User> {
        const res= api.post<Iuser>('/api/users', data as unknown as Iuser)
        const resData = await handleApiResponse<Iuser>(res)
        return new User(resData)
    }

    public static async Update (data: Partial<Iuser>) {
        const res =  api.patch<string>(`/api/users/${data.id}`, JSON.stringify(data));
        const resData = await handleApiResponse<Iuser>(res as Promise<any>);
        return new User(resData);
    }

    public static async GetAll ():Promise<User[]> {
        const res = api.get('/api/users')
        const data = await handleApiResponse<string>(res)
        const parsedData:Iuser[] = JSON.parse(data)
        const users:User[] =[]
         parsedData.forEach(i =>{users.push(new User(i))})
        return users
    }
    public static async GetById(id:number | string):Promise<User> {
        const res = api.get(`api/users/${id}`)
        const data = await handleApiResponse<string>(res)
        const parsedData:Iuser = JSON.parse(data)
        return new User(parsedData)
    }
    public static async delete (id:number | string){
        const res = api.delete(`/api/users/${id}`)
        return await handleApiResponse(res)
    }
}