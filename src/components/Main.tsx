import React, { useState } from 'react'
import BoardSize from './BoardSize';

function Main() {
    const [content, setContent] = useState(<BoardSize />);
    return (
        <div id='main-div' className='main-div'>
            <BoardSize />
        </div>
    )
}

export default Main