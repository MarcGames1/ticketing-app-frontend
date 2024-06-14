'use client'
import {Iuser} from "@/declarations/users";

export function useCurrentUser() {

    let storedUser :Iuser | undefined = undefined;
    const user = storedUser // TODO This should be an api get request for current logged in user
    const userString = localStorage.getItem('user')
    if(userString) {
        storedUser = JSON.parse(userString)
        if(storedUser && storedUser.id){
            return {user}
        }
        return {user}
    }

    return {user};
    }