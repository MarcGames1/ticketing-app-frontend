import { useEffect, useState } from "react";
import {LocalStoredData} from "@/declarations/localStorage";

const isBrowser = typeof window !== "undefined";

const useLocalStorage = (key:LocalStoredData, initial = null) => {
    const [value, setValue] = useState(() => {
        if (isBrowser) {
            const saved = window.localStorage.getItem(key);
            if (saved !== null) {
                return JSON.parse(saved);
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

    return [value, setValue];
};

export default useLocalStorage;
