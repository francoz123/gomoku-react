import styles from './Header.module.css';

function UserLogin() {
  return (
    <div className={styles.login}>
        <a href='Login' className={styles.a}>
            Login
        </a>
        <a href='PreviusGames' className={styles.a}>
            Previous games
        </a>
    </div>
  )
}

export default UserLogin