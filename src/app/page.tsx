'use client'

import {useCurrentUser} from "@/hooks/useCurrentUser";
import {useRouter} from "next/navigation";

export default function Home() {
  const router = useRouter()
  const {user} = useCurrentUser()
  if(!user) {
      router.push('/login')
  }
  console.log(user)
  return (
    <section>
   <h1>Hello {user?.lastName}</h1>
    </section>
  );
}
