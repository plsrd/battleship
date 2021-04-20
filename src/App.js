import React, { useState } from 'react'

import createComputerBoard from './utils/computerBoardFactory'
import createBoard from './utils/gameboardFactory'

import Player from './components/Player'

const App = () => {
  const [computerBoard, setComputerBoard] = useState(createComputerBoard())
  const [playerBoard, setPlayerBoard] = useState(createBoard())

  return (
    <>
      <Player 
        playerBoard={playerBoard}
        setPlayerBoard={setPlayerBoard}
      />
    </>
  );
}

export default App;
