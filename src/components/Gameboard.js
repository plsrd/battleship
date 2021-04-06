import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import createBoard from '../utils/gameboardFactory'
import createShips from '../utils/shipFactory'
import Column from "./Column"
import Shipyard from './Shipyard'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`


const Gameboard = () => {
  const [playerBoard, setPlayerBoard] = useState(createBoard())
  const [playerShips, setPlayerShips] = useState(createShips())

  return (
    <Container>
      <div>
        {Object.keys(playerBoard.columns).map(column => (<Column column={playerBoard.columns[column]} key={column}/>))}
      </div>
      <Shipyard ships={playerShips}/>
    </Container>
  )

}

export default Gameboard