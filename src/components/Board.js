import React, { useState } from 'react'
import styled from 'styled-components'

import Column from "./Column"


const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const Gameboard = ({board, selectedShip, placeShip, handleHover, shipFits}) => {
  return (
      <Container>
        {Object.keys(board.columns).map(column => (
          <Column 
            column={board.columns[column]} 
            key={column}
            selectedShip={selectedShip}
            placeShip={placeShip}
            handleHover={handleHover}
            shipFits={shipFits}
          />
          ))}
      </Container>
  )
}

export default Gameboard
