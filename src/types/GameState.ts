export  type GameState = {
  _id?: string | undefined
  board: string[][]
  moves:number[][]
  moveNumber:number
  boardSize: number
  turn:string
  date: string
  winner: string | null
  gameOver:boolean
  lastMove:[number, number] | null
}