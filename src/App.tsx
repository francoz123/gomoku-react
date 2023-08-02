import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home, Game, Login, SignUp } from './pages';
import { Header } from './components';
import { Games } from './pages';
import UserProvider from './components/UserProvider';

function App() {
  return (
    <UserProvider>
      <Header />
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='game' element={<Game bs={5} />} />
          <Route path='login' element={<Login />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='games' element={<Games />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
