'use client'
import {LoginForm} from "@/components/loginForm/loginForm";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {useRouter} from "next/navigation";

export default function LoginPage() {
  const router = useRouter()
  const [user] = useCurrentUser()
  if(user) {
   setTimeout(()=>{
     router.push('/')
   }, 300)
    return <> Loading ... </>
  } else
  return (
    <section>
    <LoginForm />
    </section>
  );
}
