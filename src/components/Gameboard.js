import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import createBoard from '../utils/gameboardFactory'
import createShips from '../utils/shipFactory'
import Column from "./Column"


const Gameboard = () => {
  const [playerBoard, setPlayerBoard] = useState(createBoard())
  const [playerShips, setPlayerShips] = useState(createShips())

  console.log(playerShips)

  return (
    <div>
      {Object.keys(playerBoard.columns).map(column => (<Column column={playerBoard.columns[column]} />))}
    </div>
  )

}

export default Gameboard