'use client'
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { AppStateProvider } from "@/context/AppStateContext";

const Providers = ({ children }: { children: React.ReactNode }) =>{
    return(
        <ThemeProvider attribute="class">
            <AppStateProvider>
                {children}
                <Toaster/>
                <div id="modal"></div>
            </AppStateProvider>
        </ThemeProvider>
    )
}
export default Providers