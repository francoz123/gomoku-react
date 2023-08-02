import React from 'react'
//import { User } from '../types'
import { UserContext } from '../context'
import { useState } from 'react'

type UserProviderProps = {
  children: React.ReactNode
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<string | undefined>(undefined)
  const [boardSize, setBS] = useState(5)
  const login = (username: string) => setUser(username)
  const logout = () => setUser(undefined)
 function setBoardSize (x: number) {
    setBS(x)
  }
   /* const setBoardSize2 = (x: number) => {setBS(x)} */
  
  return (
    <UserContext.Provider value={{ user, login, logout, setBoardSize, boardSize }}>
      {children}
    </UserContext.Provider>
  )
}
