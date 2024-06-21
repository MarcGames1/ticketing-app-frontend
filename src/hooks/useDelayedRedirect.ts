import {useEffect} from "react";
import {useRouter} from "next/navigation";
const useDelayedRedirect = () =>{
const router = useRouter()

    useEffect(()=>{
        setTimeout(()=>{
            router.push('/login')
        },3)
    })
}

export default useDelayedRedirect