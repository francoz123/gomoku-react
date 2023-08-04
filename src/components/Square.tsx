import styles from './Square.module.css';

type squareProps = {
    id: number
    row: number
    col: number
    value: string
    updateFunction: (x:number, y:number) => void
}


function Square(props: squareProps) {
  const {id, row, col, value, updateFunction} = props;

  function handleClick(){
    if (!(value)) {
        updateFunction(row, col)
    }
  }

  return (
    <div id={''+id} className={styles.square}  onClick={handleClick}>
        {value === 'w' && (<div className={styles.white+' '+styles.piece}></div>)}
        {value === 'b' && (<div className={styles.black+' '+styles.piece}></div>)}
    </div>
  )
}

export default Square