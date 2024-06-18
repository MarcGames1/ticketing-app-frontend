// app/context/AppStateContext.tsx
"use client";

import {createContext, ReactNode, useContext} from "react";
import useAppState, {AppState, UseAppStateReturn} from "@/hooks/useAppState";


const AppStateContext = createContext< UseAppStateReturn>({
    appState:AppState.Tickets_Board,
    updateAppState:() =>{},
    navigationData: []
});

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
    // const {appState} = useAppState();
   const {appState, updateAppState, navigationData}  = useAppState();
    return (
        <AppStateContext.Provider value={{appState, updateAppState, navigationData}}>
            {children}
        </AppStateContext.Provider>
    );
};

export const useAppStateContext = () => {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error("useAppStateContext must be used within an AppStateProvider");
    }
    return context;
};
