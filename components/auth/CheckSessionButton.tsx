"use client"

import { useSession } from "next-auth/react"

const CheckSessionButton = () => {
  const { data: session } = useSession()
  return <button onClick={() => console.log(session)}>check session</button>
}
export default CheckSessionButton
