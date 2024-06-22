// context/UserContext.tsx
"use client";

import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {Iuser} from "@/declarations/users";
import useLocalStorage, {LocalStoredData} from "@/hooks/useLocalStorage";
import User from "@/entities/user";
import Auth from "@/entities/Auth";
import {Iauth} from "@/declarations/auth";

interface UserContextType {
    user: User |  undefined;
    setUser: (user: Iuser | undefined) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useLocalStorage<User>(LocalStoredData.user);


    useEffect(() => {

       const authinstance =  Auth.getInstance()
        console.log("AUTH DATA CHANGED!!! =>>> ", authinstance)


    }, [Auth.getInstance()]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
