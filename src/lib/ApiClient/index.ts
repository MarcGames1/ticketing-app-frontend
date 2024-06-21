import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {getAuth} from "@/lib/ApiClient/utils";
import Auth from "@/entities/Auth";
import {Iauth} from "@/declarations/auth";
import Any = jasmine.Any;
import {headers} from "next/headers";


export class ApiClientError extends AxiosError {
    status?: number | undefined;
    message: string;




    constructor (m:string, status?:number | undefined) {
        super(m);
        this.message = m
        this.name = 'ApiClientError';
        this.status = status
        if(window && localStorage) {
            localStorage.clear()
        }
    }
}



export class ApiClientSuccess<T = any> {
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
    private failedQueue: any[];
    private isRefreshing:boolean
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.failedQueue = [];
        this.isRefreshing = true;
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl, withCredentials: true,
        } );
        this._initInterceptors()


    }

    private _initInterceptors() {
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const auth = getAuth()
                console.log('interceptor data')
                console.log({auth, config})
                console.log(String( config.url  && config.url.includes('refreshToken')))
                if (auth) {
                    config.headers['Authorization'] = `Bearer ${auth.idToken}`;
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        // this.axiosInstance.interceptors.response.use(
        //     (response) => response,
        //     async (error) => {
        //         const originalRequest = error.config;
        //         console.log("Original Request and Error.config",originalRequest, error.config)
        //         if (error.response?.status === 401 && !originalRequest._retry) {
        //             if (this.isRefreshing) {
        //                 return new Promise((resolve, reject) => {
        //                     this.failedQueue.push({ resolve, reject });
        //                 })
        //                     .then(token => {
        //                         originalRequest.headers['Authorization'] = 'Bearer ' + token;
        //                         return this.axiosInstance(originalRequest);
        //                     })
        //                     .catch(err => {
        //                         return Promise.reject(err);
        //                     });
        //             }
        //
        //             originalRequest._retry = true;
        //             this.isRefreshing = true;
        //
        //             return new Promise((resolve, reject) => {
        //                 const auth = getAuth()
        //                 if (!auth) return reject(new Error('No auth instance available'));
        //
        //                 this.refreshToken().then((token) => {
        //                     auth.updateTokens(token);
        //                     this.processQueue(null, token);
        //                     resolve(this.axiosInstance(originalRequest));
        //                 }).catch((err) => {
        //                     this.processQueue(err, null);
        //                     reject(err);
        //                 }).finally(() => {
        //                     this.isRefreshing = false;
        //                 });
        //             });
        //         }
        //         return Promise.reject(error);
        //     }
        // );
    }

    private async refreshToken(): Promise<Partial<Iauth>> {
        const auth = getAuth()
      if(!auth) {return getAuth() as Auth }

        const {accessToken, refreshToken} = auth
        try {
            const response = await axios.post(`${this.baseUrl}/api/auth/refreshToken`, { refreshToken, accessToken });
            if (response.status === 200) {
                const {accessToken, idToken} = response.data;

                return {accessToken, idToken}
            } else {
                throw new ApiClientError('Unable to refresh token');
            }
        } catch (error) {
            throw new ApiClientError('Unable to refresh token');
        }
    }
    private processQueue(error: any, token: Partial<Iauth> | null = null) {
        this.failedQueue.forEach(prom => {
            console.log("Processing failed Queue")
            if (error) {
                prom.reject(error);
                console.log("prom.reject")
                console.table(prom)
            } else {
                prom.resolve(token?.idToken || '');
                console.log("prom.resolve")
                console.table(prom)
            }
        });
        this.failedQueue = [];
    }

    get<T=any>(url: string ,config = {}): Promise<ApiClientSuccess<T> | ApiClientError> {
        console.log("Get ",this.baseUrl + url,)
        return this.request({
            ...config,
            method: 'get',
            url: this.baseUrl + url,
            withCredentials: true,

        });
    }

    post<T = any>(url: string, data: T, config: AxiosRequestConfig<any> = {}): Promise<ApiClientSuccess<T> | ApiClientError> {
        console.log("POST ",this.baseUrl + url,)
        return this.request({
            ...config,
            method: 'post',
            url: this.baseUrl + url,
            data,
        });
    }

    put<T = any>(url: string, data:T, config: AxiosRequestConfig<any> = {}): Promise<ApiClientSuccess<T> | ApiClientError> {
        return this.request({
            ...config,
            method: 'put',
            url: this.baseUrl + url,
            data,
        });
    }
    patch<T = any>(url: string, data: T, config: AxiosRequestConfig<any> = {}): Promise<ApiClientSuccess<T> | ApiClientError> {
        return this.request({
            ...config,
            method: 'patch',
            url: this.baseUrl + url,
            data,
        });
    }

    delete(url: string, config: AxiosRequestConfig<any> = {}): Promise<ApiClientSuccess<any> | ApiClientError> {
        return this.request({
            ...config,
            method: 'delete',
            url: this.baseUrl + url,
        });
    }

    async request<T = any>(config: AxiosRequestConfig<T>) : Promise<ApiClientSuccess<T> | ApiClientError>{

        try {
            const response: AxiosResponse = await this.axiosInstance({
                validateStatus: () => true,
                ...config,
                withCredentials: true,

            });
            if(response.status === 401) {
              const auth =  await this.refreshToken()
                const previousConfig = config

                this.isRefreshing &&     this.axiosInstance.interceptors.request.use(
                    (config) => {
                        this.isRefreshing = false
                        if(auth){
                            config.headers['Authorization'] = `Bearer ${auth.idToken}`;
                        }
                        console.log('interceptor data')
                        console.log({auth, config})
                        console.log(String( config.url  && config.url.includes('refreshToken')))
                        if (auth && config && config.url  &&  !config.url.includes('refreshToken')) {
                            config.headers['Authorization'] = `Bearer ${auth.idToken}`;
                        }

                        return config;
                    },
                    (error) => Promise.reject(error)
                );




                return  this.request({...previousConfig, headers:{
                    ...previousConfig.headers,
                    "Authorization": `Bearer ${auth.idToken}`
                    }})

            }
            if (response.status === 400 || response.status >= 402 && response.status <= 499) {
                return new ApiClientError(String(response.data));
            }
            else if(response.status >= 200 && response.status <= 399){
                this.isRefreshing = true
                return new ApiClientSuccess(response.status, response.statusText, response.data )
            }
            else {
                return new ApiClientError(
                    String(response?.statusText || 'Server Error'),
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