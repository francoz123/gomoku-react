import styles from './Games.module.css'
import { GameRecord } from '../types';
import { useNavigate } from 'react-router-dom';
import { get } from '../utils/http'
import { useEffect, useState } from 'react';

// Displays finished games and their outcomes
export default function Games() {
  const navigate = useNavigate()
  let gr: GameRecord[] = []
  const [gameRecords, setGameRecords] = useState(gr)
  const [games, setGames] = useState(gr)
  //let games: GameRecord[] = savedGAmes?  JSON.parse(savedGAmes) : null

  useEffect(() => {
    getGamesFromServer()
  }, [])

  async function getGamesFromServer() {
    const API_HOST = process.env.REACT_APP_API_HOST
      const gameRecords = await get<GameRecord[]>(
        `${API_HOST}/api/game/games`
      )
      
      setGameRecords(gameRecords)
  }

  return (
    <main>
      {games.length===0 && <p className={styles.info}>No games available</p>}
      {games.length>0 && <div className={styles.container}>
        {games.map((game) => 
          (<div className={styles.logs}>
            <div className={styles.log}>
              <div className={styles.gameInfo}>
                <div className={styles.record}>
                  Game #{game.id} @{game.date}
                </div>
                <div className={styles.record}>
                  {game.winner === 'Draw'? 'Game was a draw':'Winner: '+game.winner}
                </div>
              </div>
              <button onClick={() => navigate(`/game-log/${game.id}`)}>
                View game log
              </button>
            </div>
          </div>
        )
        )}
      </div>}
    </main>
  )
}
