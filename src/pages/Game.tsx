import { useState, useContext } from 'react'
import styles from './Game.module.css'
import { Navigate, useNavigate } from 'react-router-dom';
import { Square } from '../components';
import { UserContext } from '../context';
import { GameRecord } from '../types';

function Game(props: {bs: number}) {
    const { user, boardSize } = useContext(UserContext)
    const navigate = useNavigate()
    const [moveNumber, setMoveNumber] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [turn, setTurn] = useState('b');
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
    const [message, setMessage] = useState((turn === 'b'? 
        'Black':'White')+' to play');
    ///const localStorage = useLocalStorage()
    if (!user) return <Navigate to='/login' />
    let elements = initializeElements()

    function changeTurn() {
        setTurn(t => t = t === 'b'? 'w': 'b')
    }

    function validSquare(x: number, y:number): boolean{
        return (x >=0 && x<=boardSize && y>=0 && y<boardSize)
    }

    function updateBoard(x:number, y:number) {
        console.clear()
        console.log(board)
        console.log(turn)
        if (gameOver) return
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
            return
        }
        if (draw()) {
            setGameOver(true)
            setMessage('Draw')
            return
        }
        console.log(countPieces(x, y))
        console.log(turn)
        if (!gameOver) {
            changeTurn()
            setMessage((turn === 'w'? 'Black':'White')+' to play')
        }

    }

    function countPieces(yCoord:number, xCoord:number) {
        let count = 1;
        let currentTurn = turn
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
    
                    count = currernCount
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
        setGameOver(true)
        return true
    }
    
    function initializeElements() {
        return (<div id='board' className={styles.board}>
        {
            Array.from({length:boardSize}).map( (_, index) => 
            <div id={''+index} className={styles.row}>
                {Array.from({length:boardSize}).map((_, i) => 
                    {
                        let id = index * boardSize + i;
                        return <Square 
                            id={id}
                            row={index}
                            col={i}
                            value={board[index][i]}
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
      games.push ({'id':id, 'game':currenGame, 'date':date, 'winner': turn})
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
            <div id='btnContainer' className={styles.btnContainer}>
                <button onClick={resetBoard}>Reset</button>
                <button onClick={() => {
                    leaveGame()
                    navigate('/games')}
                    }>Leave game</button>
            </div>
          </div>
      </main>
    )//
}

export default Game