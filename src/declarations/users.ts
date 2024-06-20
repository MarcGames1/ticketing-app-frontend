import {Idepartment} from "@/declarations/deptartment";

export interface Iuser {
    department?:Idepartment,
    email: string,
    firstName: string,
    id: number,
    lastName:string,
    role:EmployeeRole,
}


export enum EmployeeRole {
    MANAGER="MANAGER",  // big BO$$
    EMPLOYEE= 'EMPLOYEE', // WORKER / poor people
    SUPERVISOR= "SUPERVISOR"// little boss
}