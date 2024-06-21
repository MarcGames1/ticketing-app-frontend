import { Iauth } from "@/declarations/auth";

class Auth {
    private static instance: Auth | undefined;
    private _accessToken: string;
    private _idToken: string;
    private _refreshToken: string;

    // Private constructor
    private constructor(authData: Iauth ) {
            this._accessToken = authData.accessToken;
            this._refreshToken = authData.refreshToken;
            this._idToken = authData.idToken;
    }
    // remove singleton instance when signout
    static signOut (){
        Auth.instance = undefined

    }

    // Static method to get the instance of Auth
    public static getInstance(authData?: Iauth | string): Auth | undefined {
        if(Auth.instance){
            return Auth.instance
        }
        if(authData){
            if(typeof authData === 'string'){
               const parsed=  JSON.parse(authData) as unknown as Iauth
                Auth.instance = new Auth(parsed)
                Auth.writeToLocalStorage(Auth.instance)
                return Auth.instance
            } else {
                Auth.instance = new Auth(authData)
                Auth.writeToLocalStorage(Auth.instance)
                return Auth.instance
            }
        }
        if(!Auth.instance) {
        // try get instance from ls
            const data = Auth.getDataFromLocalStorage()
            if(data){
                Auth.instance = data

            }
        }


        return undefined
    }

     static getDataFromLocalStorage() {
            if( typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'){
                const authData = localStorage.getItem('auth')
                return authData ?  Auth.getInstance(JSON.parse(authData)) : undefined
            } else return undefined

    }

    static writeToLocalStorage(instance:Auth){
        if( typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'){
            localStorage.setItem('auth', JSON.stringify(instance))
            return true
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
        if (tokens.accessToken !== undefined) {
            this._accessToken = tokens.accessToken;
            Auth.writeToLocalStorage(this)
        }
        if (tokens.idToken !== undefined) {
            this._idToken = tokens.idToken;
        }
    }
}

export default Auth;
