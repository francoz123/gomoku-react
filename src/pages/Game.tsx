import { useState, useContext, useEffect } from 'react'
import styles from './Game.module.css'
import { Navigate, useNavigate } from 'react-router-dom';
import { Square } from '../components';
import { UserContext } from '../context';
import { GameRecord, GameState, GameUpdate } from '../types';
import { put } from '../utils/http'

/**
 * Repressents the game.
 * Prrovides fuctions to update the board and change turns,
 * as well as calculate wins and draws
 * @returns Game component
 */
function Game() {
  const { user, boardSize } = useContext(UserContext)
  const navigate = useNavigate()
  const [moveNumber, setMoveNumber] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [turn, setTurn] = useState('b');
  const [pause, setPause] = useState(false);

  const [board, setBoard] = useState(
    Array.from({length:boardSize}).map((_) => 
      Array.from({length:boardSize}).map((i) => '')
    )
  );

  const [moves, setMoves] = useState(
    Array.from({length:boardSize}).map((_) =>
      Array.from({length:boardSize}).map((i) => 0)
    )
  );

  const [gameState, SetGameState] = useState<GameState>(
    {
      board: board,
      moves:moves,
      moveNumber:0,
      boardSize: boardSize,
      turn:turn,
      date: getDate(),
      winner: null,
      gameOver:false,
      lastMove:null
    }
  )

  const [message, setMessage] = useState(
    (turn === 'b'? 'Black':'White')+' to play'
  );

  useEffect(() => {
    updateServer()
  })

  const updateServer = async () => {
    const API_HOST = process.env.REACT_APP_API_HOST
    try {
      const update = await put<GameState, GameUpdate>(`${API_HOST}/api/game/gameplay`, gameState)
      setGameOver(update.gameOver)
      
      let newSate = {...gameState}
      newSate._id = update._id
      newSate.winner = update.winner
      newSate.gameOver = update.gameOver
      SetGameState(newSate)

      return true
    } catch (error) {
      if (error instanceof Error) {
        return error.message
      }
      return 'Unable to login at this moment, please try again'
    }
  }

  if (!user) return <Navigate to='/login' />
  let elements = initializeElements()

  function changeTurn() {
    setTurn(t => t = t === 'b'? 'w': 'b')
  }

  function validSquare(x: number, y:number): boolean{
    return (x >=0 && x<=boardSize && y>=0 && y<boardSize)
  }

  function connectAndUpdate(x:number, y:number){
    
  }

  function updateBoard(x:number, y:number) {
    if (gameOver) return 0
    let newBoard = [...board]
    newBoard[x][y] = turn
    setBoard(newBoard)

    let newMoves = [...moves]
    newMoves[x][y] = moveNumber
    setMoves(newMoves)
    setMoveNumber(num => num + 1)

    if (countPieces(x, y) >= 5) {
      setGameOver(true)
      setMessage((turn === 'w'? 'White': 'Black' ) + ' wins')
      setWinner((turn === 'w'? 'White': 'Black'))
      return 5
    }

    if (draw()) {
      setGameOver(true)
      setWinner('Draw')
      setMessage('Draw')
      return
    }

    if (!gameOver) {
      changeTurn()
      setMessage((turn === 'w'? 'Black':'White')+' to play')
    }
  }

  function countPieces(yCoord:number, xCoord:number) {
    let count = 1;
    let currentTurn = turn
    let counts = [[0,0,0], [0,0,0], [0,0,0]]
    // Counts in all possible directions
    for (let dy = -1; dy <= 1; dy++) { // (-1, -1), (-1, 1) etc
      for (let dx = -1; dx <= 1; dx++) {
        let currernCount = 1

        if (dx === 0 && dy === 0) continue // Skips start location
        let x = xCoord + dx
        var y = yCoord + dy

        if (!validSquare(x, y)) continue

        let square = board[y][x]

        if (square === currentTurn){
          currernCount++
          let x1 = x + dx
          let y1 = y + dy

          if (!validSquare(x1, y1)) continue

          square = board[y1][x1]
          
          while (square === currentTurn) {
            currernCount++
            x1 += dx
            y1 += dy
            if (validSquare(x1, y1)) square = board[y1][x1]
            else break
          }
          counts[1+dy][1+dx] = currernCount-1
          count = currernCount + counts[1+(-dy)][1+(-dx)]
          if (count >= 5) {
            setGameOver(true)
            return count
          }
          
        }
      }
    }
    return count
  }

  function draw() {
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if(board[i][j] === '') return false
      }
    }
    return true
  }
  
  function initializeElements() {
    return (<div id='board' className={styles.board}>
    {
      Array.from({length:boardSize}).map( (_, index) => 
      <div id={'row'+index} key={'row'+index} className={styles.row}>
        {Array.from({length:boardSize}).map((_, i) => 
          {
            let id = index * boardSize + i;
            return <Square 
              id={id}
              key={id}
              row={index}
              col={i}
              value={board[index][i]}
              pause={pause}
              pauseFunction={setPause}
              updateFunction={updateBoard}
            />
          }
        )}
      </div> 
      )
    }
    </div>)
  }

  function resetBoard() {
    let newBoard = [...board]
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        newBoard[i][j] = ''
      }
    }

    setMoveNumber(1)
    setBoard(newBoard)
    setGameOver(false)
    setTurn('b')
    setMessage('Black to play')
  }

  function leaveGame() {
    let currenGame = board.map((row, rowIndex) => {
      return row.map ((square, squareIndex) => 
        [board[rowIndex][squareIndex], moves[rowIndex][squareIndex]])
      })
    let games: GameRecord[] | any = []
    let gameLogs = window.localStorage.getItem('gameLogs');

    if (gameLogs) games = JSON.parse(gameLogs)

    let id = games.length + 1
    let date = getDate()
    games.push ({'id':id, 'boardSize':boardSize, 'game':currenGame, 'date':date, 'winner': winner})
    window.localStorage.setItem('gameLogs',JSON.stringify (games))
  }

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }

  return (
    <main>
      <div className={styles.container}>
        <div id='info' className={styles.info}>{message}</div>
          {elements}
          <div  className={styles.buttonContainer}>
            <button onClick={resetBoard}>Reset</button>
            <button onClick={() => {
                if (gameOver) {
                  leaveGame()
                  navigate('/games')
                } else navigate('/')
              }
            }>
              Leave
            </button>
          </div>
        </div>
    </main>
  )//
}

export default Game