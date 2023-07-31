import React, { ChangeEventHandler, useEffect, useState } from 'react'
import Styles  from './BoardSize.module.css';
import Main from './Main';
import Game from './Game';
import { PLAYER } from './Piece';

const maxSize = 16;


function BoardSize() {
    const [removeBoard, setBoardVisbility] = useState(false);
    const [value, setValue] = useState(0);
    function removeBoardSizeInput(){
        setBoardVisbility((v) => !v);
    }
    
  return (
    (<>
        {!removeBoard &&
        (<div className={Styles.boardSizeFormContainer} id='board-size-form-container'>
            <form action="" className={Styles.boardSizeForm}>
                <label htmlFor="board-size">Select board size</label>
                <select name="board-size-select" id="board-size-select"  
                className={Styles.boardSizeSelect} size={16} value={5}
                >
                    {Array.from({length:maxSize}).map((_, index) => {
                        return <option value={index+5}>{index+5} </option>
                    })}
                    
                </select>

                <StartButton onClick={removeBoardSizeInput} />
            </form>
                
        </div>)}

        {removeBoard &&
        (
            <Game boardSize={5} />
        )}
    </>
    )
  )//<Board size={7} game={new Game(7, PLAYER.BLACK)} />
}


function StartButton(props: {onClick: ()=>void}) {
    const [buttonPressed, setButtonPressed] = useState(false);
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