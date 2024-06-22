import {ApiClientError, ApiClientSuccess} from "@/lib/ApiClient/index";
import Auth from "@/entities/Auth";
const isClientSide =  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

export const clearLocalStorage = (callback?: (() => void) | undefined) =>{
    if( typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'){
        localStorage.clear()
        if(callback){
            callback()
        }
    }
}
export async function handleApiResponse<T>(promise: Promise<ApiClientSuccess<T> | ApiClientError>): Promise<T> {
    const res = await promise;

    if ('data' in res) {
        return res.data;
    } else {
        console.log('Handle Api Response =>',res)
        // clearLocalStorage()
        throw res
    }
}



