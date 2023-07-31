import React from 'react'
import styles from './Board.module.css';

export enum PLAYER{
    BLACK = "Black",
    WHITE = "White"
}

function Piece(props:{player: PLAYER | null, id: Number}) {
    const {player, id} = props;
    return (
        <div id={''+id} 
        className={player === PLAYER.WHITE? styles.white : styles.Black}>   
        </div>
    )
}

export default Piece