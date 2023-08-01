import React from 'react'
import { User } from '../types'
import { UserContext } from '../context'
import { useState } from 'react'

type UserProviderProps = {
  children: React.ReactNode
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined)
  
  const login = (username: string) => setUser(user)
  const logout = () => setUser(undefined)
  
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
