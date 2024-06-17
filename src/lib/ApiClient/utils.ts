import {ApiClientError, ApiClientSuccess} from "@/lib/ApiClient/index";

export async function handleApiResponse<T>(promise: Promise<ApiClientSuccess<T> | ApiClientError>): Promise<T> {
    const res = await promise;

    if ('data' in res) {
        return res.data;
    } else {
        console.log(res)
        throw new Error("API ERROR");
    }
}

export function getCurrentUserId () {
    const lsString = localStorage.getItem('user')
    console.log(lsString)
    if(!lsString || lsString === 'null'|| lsString === "undefined"){
        return undefined
    }
    const user = JSON.parse(String(lsString))
    if(user && user.id) {
        return user.id
    }

}