import React from "react"
import MainLayout from "./MainLayout"
import { Navigate } from "react-router-dom"
import { useAuthProvider } from "../providers/AuthProvider"

const ProtectedRoutes = () => {
  const { isUserLoggedIn } = useAuthProvider()

  return (
    <>{isUserLoggedIn ? <MainLayout /> : <Navigate to={"/auth/login"} />}</>
  )
}

export default ProtectedRoutes
