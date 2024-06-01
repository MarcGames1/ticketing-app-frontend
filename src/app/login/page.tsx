'use client'
import {LoginForm} from "@/components/loginForm/loginForm";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {useRouter} from "next/navigation";

export default function Home() {
  const router = useRouter()
  const {user} = useCurrentUser()
  if(user) {
    router.push('/')
  }
  return (
    <section>
    <LoginForm />
    </section>
  );
}
