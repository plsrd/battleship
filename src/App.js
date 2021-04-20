import React, { useState } from 'react'

import createComputerBoard from './utils/computerBoardFactory'
import createBoard from './utils/gameboardFactory'

import Player from './components/Player'
import Board from "./components/Board"

const App = () => {
  const [computerBoard, setComputerBoard] = useState(createComputerBoard())
  const [playerBoard, setPlayerBoard] = useState(createBoard())

  return (
    <>
      <Player 
        playerBoard={playerBoard}
        setPlayerBoard={setPlayerBoard}
      />
      <Board
        board={computerBoard}
      />
    </>
  );
}

export default App;
