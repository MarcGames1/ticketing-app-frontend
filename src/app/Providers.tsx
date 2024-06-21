'use client'
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { AppStateProvider } from "@/context/AppStateContext";
import { UserProvider } from "@/context/UserContext";

const Providers = ({ children }: { children: React.ReactNode }) =>{
    return(
        <ThemeProvider attribute="class">
            <UserProvider>
            <AppStateProvider>
                {children}
                <Toaster/>
                <div id="modal"></div>
            </AppStateProvider>
            </UserProvider>
        </ThemeProvider>
    )
}
export default Providers