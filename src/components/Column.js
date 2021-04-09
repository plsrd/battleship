import React from 'react'
import styled from "styled-components"

import Cell from './Cell'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Column = ({column, selectedShip, placeShip, handleHover}) => {
  return (
    <Container >
      {column.map(cell => 
        <Cell 
          cell={cell} 
          key={cell.id}
          selectedShip={selectedShip}
          placeShip={placeShip}
          handleHover={handleHover}
        />)}
    </Container>
  )
}

export default Column 