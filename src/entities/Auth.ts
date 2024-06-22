import {Iauth} from "@/declarations/auth";
import {clearLocalStorage} from "@/lib/ApiClient/utils";

class Auth {
    private static instance: Auth | undefined;
    private _accessToken: string;
    private _idToken: string;
    private _refreshToken: string;

    // Private constructor
    private constructor(authData: Iauth,  ) {
            this._accessToken = authData._accessToken;
            this._refreshToken = authData._refreshToken;
            this._idToken = authData._idToken;

    }
    // remove singleton instance when signout
    static signOut (){
        Auth.instance = undefined
        clearLocalStorage()

    }

    // Static method to get the instance of Auth
    public static getInstance(): Auth | undefined{
    if(Auth.instance && Auth.instance._idToken){
    return Auth.instance
} else if(!Auth.instance)
{
            // try get instance from ls
            const data = Auth.getDataFromLocalStorage()
            if(data && data._idToken){
                return data
            }
        }
    return undefined
}
    // Static Method to set values to the instance of Auth
    public static setInstanceValues(authData: Iauth): Auth  {

        let instance  = new Auth(authData)
        Auth.writeToLocalStorage(instance)
        return instance

    }

     static getDataFromLocalStorage() {
            if( typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'){
                const authData = localStorage.getItem('auth')
                if(authData && authData !== "{}" && authData.length > 20){
                    return Auth.setInstanceValues(JSON.parse(authData))
                }

            }
            else return undefined
    }

    static writeToLocalStorage(instance:Auth){
        if( typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'){
            const stringifiedData = JSON.stringify(instance)
            if( stringifiedData.length > 20){
                localStorage.setItem('auth', JSON.stringify(instance))
                return true
            }

        }
        return false
    }
    // Getters and Setters
    get accessToken(): string {
        return this._accessToken;
    }

    set accessToken(value: string) {
        this._accessToken = value;
        Auth.writeToLocalStorage(this)
    }

    get idToken(): string {
        return this._idToken;
    }

    set idToken(value: string) {
        this._idToken = value;
        Auth.writeToLocalStorage(this)
    }

    get refreshToken(): string {
        return this._refreshToken;
    }

    set refreshToken(value: string) {
        this._refreshToken = value;
        Auth.writeToLocalStorage(this)
    }

    // Method to update tokens
    public updateTokens(tokens: Partial<Iauth>): void {
        if (tokens._accessToken !== undefined) {
            this._accessToken = tokens._accessToken;
            Auth.writeToLocalStorage(this)
        }
        if (tokens._idToken !== undefined) {
            this._idToken = tokens._idToken;
        }
    }
}

export default Auth;
