import Logo from './Logo';
import styles from './Header.module.css';
import UserLogin from './UserLogin';


function Header() {
  return (
    <header className={styles.header}>
        <Logo />
        <UserLogin />
    </header>
  )
}

export default Header