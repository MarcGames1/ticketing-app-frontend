import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {getAuth, handleApiResponse} from "@/lib/ApiClient/utils";
import Auth from "@/entities/Auth";
import {Iauth} from "@/declarations/auth";

const auth = getAuth()

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
    private failedQueue: any[];
    private isRefreshing:boolean
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.failedQueue = [];
        this.isRefreshing = false;
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl, withCredentials: true, // todo change it
        } );
        this._initInterceptors()


    }

    private _initInterceptors() {
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const auth = getAuth()
                if (auth) {
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response?.status === 401 && !originalRequest._retry) {
                    if (this.isRefreshing) {
                        return new Promise((resolve, reject) => {
                            this.failedQueue.push({ resolve, reject });
                        })
                            .then(token => {
                                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                                return this.axiosInstance(originalRequest);
                            })
                            .catch(err => {
                                return Promise.reject(err);
                            });
                    }

                    originalRequest._retry = true;
                    this.isRefreshing = true;

                    return new Promise((resolve, reject) => {
                        const auth = getAuth()
                        if (!auth) return reject(new Error('No auth instance available'));

                        this.refreshToken().then((token) => {
                            auth.updateTokens(token);
                            this.processQueue(null, token);
                            resolve(this.axiosInstance(originalRequest));
                        }).catch((err) => {
                            this.processQueue(err, null);
                            reject(err);
                        }).finally(() => {
                            this.isRefreshing = false;
                        });
                    });
                }
                return Promise.reject(error);
            }
        );
    }

    private async refreshToken(): Promise<Partial<Iauth>> {
      if(!auth) {return getAuth() as Auth }
        const refreshToken = auth.refreshToken;
        try {
            const response = await axios.post(`${this.baseUrl}/api/auth/refreshToken`, { refreshToken });
            if (response.status === 200) {
                const {accessToken, refreshToken} = response.data;

                return {accessToken, refreshToken}
            } else {
                throw new Error('Unable to refresh token');
            }
        } catch (error) {
            throw new ApiClientError('Unable to refresh token');
        }
    }
    private processQueue(error: any, token: Partial<Iauth> | null = null) {
        this.failedQueue.forEach(prom => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(token?.accessToken || '');
            }
        });
        this.failedQueue = [];
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