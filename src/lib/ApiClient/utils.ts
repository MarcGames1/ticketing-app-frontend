import {ApiClientError, ApiClientSuccess} from "@/lib/ApiClient/index";

export async function handleApiResponse<T>(promise: Promise<ApiClientSuccess<T> | ApiClientError>): Promise<T> {
    const res = await promise;
    if ('data' in res) {
        return res.data;
    } else {
        throw new Error(res.message);
    }
}

export function getCurrentUserId () {
    return 1 // TODO MODIFY THIS
}