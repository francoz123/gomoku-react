import { useContext } from 'react'
import styles from './Board.module.css'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context';
import React from 'react';
import { GameRecord } from '../types';

function GameLog() {
  const {id} = useParams()
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  if (!user) return <Navigate to='/login' />
  let games: GameRecord[] //| any = null
  let gameLogs = window.localStorage.getItem('gameLogs');
  console.log(gameLogs)
  if (!gameLogs) return  <p>No games to show</p>
  else games = JSON.parse(gameLogs)
  console.log(games)

  let thisGame: GameRecord | undefined = games.find(x => x.id == id)
  console.log(thisGame)

  let boardSize = thisGame? thisGame.game[0].length : 0
  const elements = initializeElements()
  function initializeElements() {
    return (
        <div id='board' className={styles.board}>
        {
          thisGame?.game.map( (x, index) => 
          <div id={''+index} key={index} className={styles.row}>
            {x.map((_, i) => 
              {
                let id = index * boardSize + i;
                let value = thisGame?.game[index][i][0]
                let move = thisGame?.game[index][i][1]
                return (<div id={''+id} className={styles.square}>
                {value && (<div className={(value === 'b'?styles.black:styles.white)+' '+styles.piece}>{move}</div>)}
              </div>)
              }
            )}
          </div> 
          )
        }
        </div>
    )
  }

  return (
    <main>
      <div className={styles.info}>Winner: {thisGame?.winner === 'b'? 'Black': 'White'}</div>
      {elements}
      <div className={styles.btnContainer}>
        <button onClick={() => navigate('/games')}>Back</button>
      </div>
    </main>
  )//
}

export default GameLog