import React from 'react'
import Styles  from './BoardSize.module.css';
const maxSize = 16;



function BoardSize() {
  return (
    <div className={Styles.boardSizeFormContainer} id='board-size-form-container'>
        <form action="" className={Styles.boardSizeForm}>
            <label htmlFor="board-size">Select board size</label>
            <select name="board-size-select" id="board-size-select"  
            className={Styles.boardSizeSelect} size={16}>
                {Array.from({length:maxSize}).map((_, index) => {
                    return <option value={index+5}>{index+5}</option>
                })}
                
            </select>
            <StartButton />
        </form>
            
    </div>
  )
}

function StartButton() {
    return (
      <input type="button" 
      name="start-button" 
      key={"start-button"}
      id="start-button" 
      value="Start game" 
      className={Styles.startButton} />
    )
  }


export default BoardSize