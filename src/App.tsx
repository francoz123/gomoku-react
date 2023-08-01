import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home, Game, Login, SignUp } from './pages';
import { Header } from './components';

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='game/:size' element={<Game bs={5} />} />
          <Route path='login' element={<Login />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
