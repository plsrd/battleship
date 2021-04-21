import React, { useState } from 'react'
import styled from 'styled-components'

import Column from "./Column"


const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const Gameboard = ({
  board, 
  selectedShip, 
  placeShip, 
  handleHover, 
  shipFits,
  handleShot,
  active
  }) => {
    return (
      <Container>
        {Object.keys(board.columns).map(column => (
          selectedShip !== undefined ? 
            <Column 
              column={board.columns[column]} 
              key={column}
              placeShip={placeShip}
              handleHover={handleHover}
              shipFits={shipFits}
            />
          :
            <Column 
              column={board.columns[column]} 
              key={column}
              handleShot={handleShot}
              active={active}
            />
          ))}
      </Container>
    )
}

export default Gameboard
