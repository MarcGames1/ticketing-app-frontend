import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {getCurrentUserId, handleApiResponse} from "@/lib/ApiClient/utils";


export class ApiClientError extends AxiosError {
    status?: number | undefined;
    message: string;



    constructor (m:string, status?:number | undefined) {
        super(m);
        this.message = m
        this.name = 'ApiClientError';
        this.status = status
    }
}



export class ApiClientSuccess<T> {
    status: number | undefined;
    message?: string;
    data:T;

    constructor(status: number | undefined, message: string, data: T) {
        this.status = status;
        this.message = message;
        this.data = data;
    }


}
export enum ContentType{
    formData="multipart/form-data",
    Json="application/json"
}


class ApiClient {

    private baseUrl: string;
    axiosInstance: AxiosInstance;
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl, withCredentials: false, // todo change it
        } );
        this.axiosInstance.interceptors.request.use(
            function (config) {
               config.headers.set("userId", getCurrentUserId())
                config.headers.set("Access-Control-Expose-Headers", "Origin")
                config.headers.set("Origin", "http://localhost:3000")
                return config;
            }
        )
    }

    get(url: string ,config = {}) {
        console.log("Get ",this.baseUrl + url,)
        return this.request({
            ...config,
            method: 'get',
            url: this.baseUrl + url,
            withCredentials: true,

        });
    }

    post(url: string, data: Object | FormData, config: AxiosRequestConfig<any> = {}) {
        console.log("POST ",this.baseUrl + url,)
        return this.request({
            ...config,
            method: 'post',
            url: this.baseUrl + url,
            data,
        });
    }

    put(url: string, data: string, config: AxiosRequestConfig<any> = {}) {
        return this.request({
            ...config,
            method: 'put',
            url: this.baseUrl + url,
            data,
        });
    }
    patch(url: string, data: string, config: AxiosRequestConfig<any> = {}) {
        return this.request({
            ...config,
            method: 'patch',
            url: this.baseUrl + url,
            data,
        });
    }

    delete(url: string, config: AxiosRequestConfig<any> = {}) {
        return this.request({
            ...config,
            method: 'delete',
            url: this.baseUrl + url,
        });
    }

    async request(config: AxiosRequestConfig<any>) {

        try {
            const response: AxiosResponse = await this.axiosInstance({
                validateStatus: () => true,
                ...config,
                withCredentials: true,

            });

            if (response.status >= 400 && response.status <= 499) {
                return new ApiClientError(String(response.data));
            }
            else if(response.status >= 200 && response.status <= 399){

                return new ApiClientSuccess(response.status, response.statusText, response.data )
            }
            else {
                return new ApiClientError(
                    String(response?.statusText || 'Eroare Server'),
                    response.status
                );
            }


        } catch (error) {

            if (error instanceof AxiosError) {

                return new ApiClientError(error.message);
            }
            return new ApiClientError('Unexpected error')
        }
    }



}
const api = new ApiClient(process.env.NEXT_PUBLIC_BASEURLAPI || "http://localhost:8080") // TODO


export default api;