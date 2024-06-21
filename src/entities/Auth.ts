import { Iauth } from "@/declarations/auth";

class Auth {
    private static instance: Auth | undefined;
    private _accessToken: string;
    private _idToken: string;
    private _refreshToken: string;

    // Private constructor
    private constructor(authData: Iauth | string) {
        if (typeof authData === "string") {
            const data = JSON.parse(authData) as Iauth;
            this._accessToken = data.accessToken;
            this._refreshToken = data.refreshToken;
            this._idToken = data.idToken;
        } else {
            this._accessToken = authData.accessToken;
            this._refreshToken = authData.refreshToken;
            this._idToken = authData.idToken;
        }
    }
    // remove singleton instance when signout
    static signOut (){
        Auth.instance = undefined
    }

    // Static method to get the instance of Auth
    public static getInstance(authData: Iauth | string): Auth {
        if (!Auth.instance) {
            Auth.instance = new Auth(authData);
        }
        // @ts-ignore
        Auth.instance.updateTokens(authData)
        return Auth.instance;
    }

    // Getters and Setters
    get accessToken(): string {
        return this._accessToken;
    }

    set accessToken(value: string) {
        this._accessToken = value;
    }

    get idToken(): string {
        return this._idToken;
    }

    set idToken(value: string) {
        this._idToken = value;
    }

    get refreshToken(): string {
        return this._refreshToken;
    }

    set refreshToken(value: string) {
        this._refreshToken = value;
    }

    // Method to update tokens
    public updateTokens(tokens: Partial<Iauth>): void {
        if (tokens.accessToken !== undefined) {
            this._accessToken = tokens.accessToken;
        }
        if (tokens.idToken !== undefined) {
            this._idToken = tokens.idToken;
        }
    }
}

export default Auth;
