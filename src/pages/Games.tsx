import styles from './Games.module.css'
import { GameRecord } from '../types';
import { useNavigate } from 'react-router-dom';

// Displays finished games and their outcomes
export default function Games() {
  const navigate = useNavigate()
  let savedGAmes =  (window.localStorage.getItem('gameLogs'))
  let games: GameRecord[] = savedGAmes?  JSON.parse(savedGAmes) : null
  return (
    <main>
      {!games && <p className={styles.info}>No games available</p>}
      {games && <div className={styles.container}>
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
