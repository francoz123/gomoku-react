import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context'
import styles from './Login.module.css'
import Users from '../data/users.json'

// User login form
function Login() {
  const { login } = useContext(UserContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function handleLogin() {
    setErrorMessage('')
    const user = Users.find(x => 
      x.username === username && x.password === password
    )
    if (user) {
      login('some user')
      navigate('/')
    } else {
      setErrorMessage('Incorrect username or password')
    }
  }

  return (
    <main>
      <div className={styles.container}>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <form action="" className={styles.authentication} 
          onSubmit={(e) => {
          e.preventDefault()
          handleLogin()
        }}>
          <input 
            type="text" 
            name="username" 
            id="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"/>
          <input 
            type="password"
            name="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"/>
          <button type="submit" className={styles.button}>Submit</button>
        </form>
      </div>
    </main>
)
}

export default Login