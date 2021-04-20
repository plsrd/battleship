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
  shipFits
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
            />
          ))}
      </Container>
    )
}

export default Gameboard
