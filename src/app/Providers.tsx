'use client'
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { AppStateProvider } from "@/context/AppStateContext";
import { UserProvider } from "@/context/UserContext";
import { TicketsProvider } from "@/context/TicketsContext";

const Providers = ({ children }: { children: React.ReactNode }) =>{
    return(
        <ThemeProvider attribute="class">
            <UserProvider>
                {children}
                <Toaster/>
                <div id="modal"></div>
            </UserProvider>
        </ThemeProvider>

    )
}
export default Providers