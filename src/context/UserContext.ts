import { createContext } from 'react'

type UserContextType = {
  user?: String
  login: (username: string) => void
  logout: () => void
  setBoardSize: (x: number) => void
  boardSize: number
}

const UserContext = createContext<UserContextType>({} as UserContextType)
export default UserContext
