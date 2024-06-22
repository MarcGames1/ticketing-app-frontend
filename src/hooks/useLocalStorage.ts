import {useEffect, useState} from "react";
import Auth from "@/entities/Auth";
import User from "@/entities/user";

export enum LocalStoredData {
    auth='auth',
    user="user"
}

const isBrowser = typeof window !== "undefined";

function useLocalStorage<T>(key: LocalStoredData, initial: T | undefined = undefined) {
    const [value, setValue] = useState<T | undefined>(() => {
        if (isBrowser) {
            const saved = window.localStorage.getItem(key);
            if (saved !== null && saved !== undefined) {

                if (key === LocalStoredData.auth) {
                    console.log("SETTING LOCALSTORAGE AUTH TO ", saved)
                    return Auth.getInstance() as T

                } else if (key === LocalStoredData.user) {
                    const parsed = JSON.parse(saved);
                    return new User(parsed) as T;
                }
            }
        }
        return initial;
    });

    useEffect(() => {
        if(!value){
            window.localStorage.removeItem(key)
        }
      else window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
};

export default useLocalStorage;
