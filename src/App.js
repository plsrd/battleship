import React, { useState } from 'react'

import createComputerBoard from './utils/computerBoardFactory'
import createBoard from './utils/gameboardFactory'

import Player from './components/Player'
import Board from "./components/Board"

const App = () => {
  const [computerBoard, setComputerBoard] = useState(createComputerBoard())
  const [playerBoard, setPlayerBoard] = useState(createBoard())
  const [gameActive, setGameActive] = useState()


  return (
    <>
      {!gameActive ? 
        <Player 
          playerBoard={playerBoard}
          setPlayerBoard={setPlayerBoard}
          startGame={() => setGameActive(true)}
        />
      :
        <>
          <Board 
            board={playerBoard}
          />
          <Board 
            board={computerBoard}
          />
        </>
      }
    </>
  );
}

export default App;
