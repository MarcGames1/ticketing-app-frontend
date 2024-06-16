'use client'
import { TicketsProvider } from "@/context/TicketsContext";
import { Toaster } from "@/components/ui/toaster";

const Providers = ({ children }: { children: React.ReactNode }) =>{
    return(
        <>
        <TicketsProvider>
            {children}
            <Toaster />
        </TicketsProvider>
        </>
    )
}
export default Providers