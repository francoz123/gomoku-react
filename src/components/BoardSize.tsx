import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Styles  from './BoardSize.module.css';
import { UserContext } from '../context';

const maxSize = 16;

function BoardSize() {
    const navigate = useNavigate()
    const [value, setValue] = useState('5');
    const { setBoardSize } = useContext(UserContext)
    
    return (
        <div className={Styles.boardSizeFormContainer} id='board-size-form-container'>
            <form action="" className={Styles.boardSizeForm}>
                <label htmlFor="board-size">Select board size</label>
                <select name="board-size-select" id="board-size-select"  
                    className={Styles.boardSizeSelect} 
                    size={16} 
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                >
                    {Array.from({length:maxSize}).map((_, index) => {
                        return <option value={index+5}>{index+5} </option>
                    })}
                    
                </select>

                <StartButton onClick={
                    () => {
                        setBoardSize(parseInt(value))
                        navigate('/game')
                    }
                } />
            </form>
                
        </div>
    )
}


function StartButton(props: {onClick: ()=>void}) {
    //const [buttonPressed, setButtonPressed] = useState(false);
    const { onClick } = props;
    /* useEffect(() => {buttonPressed && onClick(); 
    }, [buttonPressed, onClick]); */
    return (
      <input type="button" 
        name="start-button" 
        key={"start-button"}
        id="start-button" 
        value="Start game" 
        className={Styles.startButton} 
        onClick={onClick}
      />
    )
}

export default BoardSize