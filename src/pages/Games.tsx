import React from 'react'
import styles from './Games.module.css'

export default function Games() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.logs}>
          <div className={styles.log}>
            <div className={styles.record}>Game #1</div>
            <div className={styles.record}>Winner: Black</div>
            <button type="submit">View</button>
          </div>
        </div>
      </div>
    </main>
  )
}
