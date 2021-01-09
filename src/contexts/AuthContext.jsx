import { createContext, useState, useEffect, useContext } from 'react'
import useFetcher from '@hooks/useFetcher'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const { data, error, loading, refresh } = useFetcher('/api/me')
  const user = data?.message

  return (
    <AuthContext.Provider value={{ user, error, loading, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
