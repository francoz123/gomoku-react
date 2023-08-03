import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useContext } from 'react';
import { UserContext } from '../context';

function UserLogin() {
  const { user } = useContext(UserContext)
  return (
    <div className={styles.login}>
        {!user && <Link to='Login' className={styles.a}>
            Login
        </Link>}
        {user && <Link to='/games' className={styles.a}>
            Previous games
        </Link>}
    </div>
  )
}

export default UserLogin