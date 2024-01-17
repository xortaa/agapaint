"use client"

import { signOut } from "next-auth/react"

const LogoutButton = () => {
  return <button onClick={() => signOut()}>SIGN OUT</button>
}
export default LogoutButton
