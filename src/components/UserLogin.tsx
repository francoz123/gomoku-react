import { useNavigate } from 'react-router-dom';
import styles from './UserLogin.module.css';
import { useContext } from 'react';
import { UserContext } from '../context';

// Returs the login section of the header element
function UserLogin() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  return (
    <div className={styles.login}>
        {!user && 
          <button 
            onClick={() => navigate('Login')} 
            className={styles.loginButton}>
              Login
          </button>
        }
        {user && 
          <button 
            onClick={() => navigate('games')} 
            className={styles.loginButton}>
              Previous games
          </button>
        }
    </div>
  )
}

export default UserLogin