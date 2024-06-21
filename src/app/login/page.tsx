'use client'
import {LoginForm} from "@/components/loginForm/loginForm";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {useRouter} from "next/navigation";
import {useUserContext} from "@/context/UserContext";
import {useEffect} from "react";

export default function LoginPage() {
  const router = useRouter()
  const {user} = useUserContext()
    const isUserLoggedIn = !!user

      useEffect(()=> {
          const redirectLoggedInUserFromLoginPage = () => {
              if (isUserLoggedIn) {
                  setTimeout(() => {
                      router.push('/')
                  }, 300)
              } else  () =>{}
          }
          redirectLoggedInUserFromLoginPage()
          return () =>{}
      },[user])
  if (isUserLoggedIn){
      return <h1>Loading ...</h1>
  } else
  return (
    <section>
    <LoginForm />
    </section>
  );
}
