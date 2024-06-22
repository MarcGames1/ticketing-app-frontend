import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {Iuser} from "@/declarations/users";
import {Iauth} from "@/declarations/auth";
import {undefined} from "zod";

import Auth from "@/entities/Auth";
import {toast} from "@/components/ui/use-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export interface IloginResponseData extends Iuser{
  accessToken:string,
  refreshToken:string,
  idToken:string
}
export const handleSigninResponse =(responseData:IloginResponseData)=>{
  const user:Iuser = {
    email: responseData.email,
    lastName: responseData.lastName,
    role: responseData.role,
    id:responseData.id,
    firstName:responseData.firstName

  }
  const auth:Iauth = {
    _idToken: responseData.idToken,
    _refreshToken: responseData.refreshToken,
    _accessToken: responseData.accessToken
  }
return {user, auth}
}


