'use client'


import useAppState, {AppState} from "@/hooks/useAppState";
import BoardComponent from "@/components/Board/Board";
import {JSX, ReactNode, useEffect, useState} from "react";
import {useAppStateContext} from "@/context/AppStateContext";


// Tickets_Board ="Tickets Board",
//     Departments="Departments",
//     Users = "Users"


const MainComponent = () =>{
    const {appState, updateAppState} = useAppStateContext()
    const [currentComponent, setCurrentComponent] =useState<ReactNode>(<BoardComponent />)

    const updateComponent = (appState:AppState) =>{
        switch (appState){
            case AppState.Departments:
                setCurrentComponent(<>Departments</>)
                break
            case AppState.Users:
                setCurrentComponent(<>Users</>)
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


return <>{currentComponent}</>

}

export default MainComponent