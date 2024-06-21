import {ApiClientError, ApiClientSuccess} from "@/lib/ApiClient/index";
import Auth from "@/entities/Auth";
const isClientSide =  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

export const clearLocalStorage = () =>{
    if( typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'){

        localStorage.clear()
    }
}
export async function handleApiResponse<T>(promise: Promise<ApiClientSuccess<T> | ApiClientError>): Promise<T> {
    const res = await promise;

    if ('data' in res) {
        return res.data;
    } else {
        console.log('Handle Api Response =>',res)
        // clearLocalStorage()
        throw new ApiClientError("API ERROR");
    }
}

export function getAuth ():Auth | undefined {
    if( typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'){
       const authData = localStorage.getItem('auth')

       return authData ?  Auth.getInstance(authData) : undefined
    } else return undefined

}
