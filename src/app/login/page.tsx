'use client'
import {LoginForm} from "@/components/loginForm/loginForm";
import {useRouter} from "next/navigation";
import {useUserContext} from "@/context/UserContext";
import {useEffect} from "react";
import Link from "next/link";

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
