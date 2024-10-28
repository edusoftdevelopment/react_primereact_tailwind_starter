import React, { createContext, useContext } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const isUserLoggedIn = true

  const login = () => {}
  const logout = () => {}

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthProvider = () => {
  const { isUserLoggedIn, login, logout } = useContext(AuthContext)

  return { isUserLoggedIn, login, logout }
}
