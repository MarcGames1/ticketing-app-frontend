'use client'
import {TicketsProvider} from "@/context/TicketsContext";
import {AppStateProvider} from "@/context/AppStateContext";
import {Toaster} from "@/components/ui/toaster";
import {UserProvider} from "@/context/UserContext";

const AppLayoutProvider = ({ children }: { children: React.ReactNode }) =>{

    return <TicketsProvider>
        <AppStateProvider>
            {children}
        </AppStateProvider>
    </TicketsProvider>
}
export default AppLayoutProvider