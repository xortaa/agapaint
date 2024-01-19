"use client"

import { signIn } from "next-auth/react"

const SigninButton = () => {
  return <button onClick={() => signIn("google")}>SIGN IN</button>
}
export default SigninButton
