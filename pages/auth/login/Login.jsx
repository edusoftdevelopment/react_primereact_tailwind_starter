import React from "react"
import { Navigate } from "react-router-dom"
import { useAuthProvider } from "../../../providers/AuthProvider"

const Login = () => {
  const { isUserLoggedIn } = useAuthProvider()

  if (isUserLoggedIn) {
    return <Navigate to={"/"} />
  }

  return <>Login</>
}

export default Login
