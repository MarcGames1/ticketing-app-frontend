'use client'
import {Iuser} from "@/declarations/users";

export function useCurrentUser() {
    let user :Iuser | undefined = undefined;
   const userString = localStorage.getItem('user')
    if(userString) {
        user = JSON.parse(userString)
        return {user}
    }

    return {user};
    }