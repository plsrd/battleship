import React from 'react'
import styled from "styled-components"

import Cell from './Cell'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Column = ({column, selectedShip, placeShip, getHoveredCells}) => {
  return (
    <Container >
      {column.map(cell => 
        <Cell 
          cell={cell} 
          key={cell.id}
          selectedShip={selectedShip}
          placeShip={placeShip}
          getHoveredCells={getHoveredCells}
        />)}
    </Container>
  )
}

export default Column 