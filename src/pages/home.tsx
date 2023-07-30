import Header from '../components/Header';
import BoardSize from '../components/BoardSize';
import styles from './Home.module.css';


function Home() {
  return (
    <>
        <Header />
        <div id='main' className='main'>
            <BoardSize />
        </div>
    </>
  )
}

export default Home