import { useContext, useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context'
import styles from './Login.module.css'

function SignUp() {
  const { login } = useContext(UserContext)
  const usernameInput = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function handleLogin() {
    setErrorMessage('')
    if (password === cpassword) {
      login('some user')
      navigate('/game')
    } else {
      setErrorMessage('Passwords so not match.')
    }
  }

  useEffect(() => {
    if (usernameInput.current) {
      usernameInput.current.focus()
    }
  }, [])


  return (
    <main>
      <div className={styles.container}>
        <form action="" 
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin()
        }}
          className={styles.authentication}>
          <input type="text" 
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
          <input 
            type="cpassword" 
            name="cpassword" 
            id="cpassword2" 
            value={cpassword} 
            onChange={(e) => setCPassword(e.target.value)}
            placeholder="confirm password"/>
          <button type="submit" className={styles.button}>Submit</button>
        </form>
      </div>
    </main>
  )
}

export default SignUp