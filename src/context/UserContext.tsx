// context/UserContext.tsx
"use client";

import { createContext, ReactNode, useContext } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {Iuser} from "@/declarations/users";
import useLocalStorage, {LocalStoredData} from "@/hooks/useLocalStorage";
import User from "@/entities/user";
import Auth from "@/entities/Auth";

interface UserContextType {
    user: User |  undefined;
    setUser: (user: Iuser | undefined) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useLocalStorage<User>(LocalStoredData.user);
    // try to get user from local storage



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
