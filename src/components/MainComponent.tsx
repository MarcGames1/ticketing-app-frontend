'use client'


import useAppState, {AppState} from "@/hooks/useAppState";
import BoardComponent from "@/components/Board/Board";
import {JSX, ReactNode, useEffect, useState} from "react";
import {useAppStateContext} from "@/context/AppStateContext";
import UsersBoard from "@/components/UsersBoard/UsersBoard";
import DepartmentsBoard from "@/components/DepartmentsBoard/DepartmentsBoard";


// Tickets_Board ="Tickets Board",
//     Departments="Departments",
//     Users = "Users"


const MainComponent = () =>{
    const {appState, updateAppState} = useAppStateContext()
    const [currentComponent, setCurrentComponent] =useState<ReactNode>(<BoardComponent />)

    const updateComponent = (appState:AppState) =>{
        switch (appState){
            case AppState.Departments:
                setCurrentComponent(<DepartmentsBoard />)
                break
            case AppState.Users:
                setCurrentComponent(<UsersBoard />)
                break
            case AppState.Tickets_Board:
                setCurrentComponent(<BoardComponent />)
                break
            default:
                break
        }
    }

    useEffect(() => {
        updateComponent(appState)
        console.log("render Main Component")
    }, [appState]);


return <main
    className={'overflow-y-hidden scrollbar-thin scrollbar-thumb-mainPurple scrollbar-track-transparent flex-1 p-4 space-x-4 bg-lightGrey dark:bg-veryDarkGrey flex'}>
    {currentComponent}
</main>

}

export default MainComponent