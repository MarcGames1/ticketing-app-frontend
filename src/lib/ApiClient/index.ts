import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import Auth from "@/entities/Auth";
import {Iauth} from "@/declarations/auth";



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
                const auth = Auth.getInstance()
                if (auth) {
                    config.headers['Authorization'] = `Bearer ${auth.idToken}`;
                }

                return config;
            },
            (error) => Promise.reject(error)
        );


    }

    private async refreshToken(): Promise<Partial<Iauth>> {
        const auth = Auth.getInstance()
      if(!auth) {throw new Error("Could not Refresh Tokens")}

        const {accessToken, refreshToken} = auth
        try {
            const response = await axios.post(`${this.baseUrl}/api/auth/refreshToken`, { refreshToken, accessToken });
            if (response.status === 200) {
                const {accessToken, idToken} = response.data;
                        Auth.setInstanceValues({_refreshToken:auth.refreshToken, _accessToken:accessToken, _idToken:idToken})
                return {_accessToken:accessToken, _idToken:idToken}
            } else {
                throw new ApiClientError('Unable to refresh token');
            }
        } catch (error) {
            throw new ApiClientError('Unable to refresh token');
        }
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
                        if (auth && config && config.url  &&  !config.url.includes('refreshToken')) {
                            config.headers['Authorization'] = `Bearer ${auth._idToken}`;
                        }

                        return config;
                    },
                    (error) => Promise.reject(error)
                );

                return  this.request({...previousConfig, headers:{
                    ...previousConfig.headers,
                    "Authorization": `Bearer ${auth._idToken}`
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
const api = new ApiClient(`${process.env.NEXT_PUBLIC_API}`)

export default api;