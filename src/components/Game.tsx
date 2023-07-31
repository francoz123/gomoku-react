import React, { useState } from 'react'
import Square from './Square';
import styles from './Board.module.css'


function Game(props: {boardSize: number}) {
    const {boardSize} = props;
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
    //const [elements, setElements] = useState(initializeElements())
    let elements = initializeElements()

    function changeTurn() {
        setTurn(t => t = t === 'b'? 'w': 'b')
        //turn === 'b'? setTurn('w') : setTurn('b')
    }

    function validSquare(x: number, y:number): boolean{
        return (x >=0 && x<=boardSize && y>=0 && y<boardSize)
    }

    function updateBoard(x:number, y:number) {
        if (gameOver) return
        let newBoard = [...board]
        newBoard[x][y] = turn
        setBoard(newBoard)

        let newMoves = [...moves]
        newMoves[x][y] = moveNumber
        setMoves(newMoves)
        setMoveNumber(num => num + 1)

        if (countPieces(x, y) === 5) {
            setGameOver(true)
            setMessage((turn === 'w'? 'White': 'Black' ) + ' wins')
            return
        }
        if (draw()) {
            setGameOver(true)
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
                    if (count === 5) {
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

    return (
        <div id='main' className='main'>
            <div id='info' className={styles.info}>{message}</div>
            {elements}
            <div id='btnContainer' className='btnContainer'>
                <button onClick={resetBoard}>Reset</button>
                <button>Leave game</button>
            </div>
        </div>
    )//
}

export default Game