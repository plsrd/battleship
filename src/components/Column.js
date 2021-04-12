import React from 'react'
import styled from "styled-components"

import Cell from './Cell'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Column = ({
  column, 
  selectedShip, 
  placeShip, 
  handleHover,
  shipFits}) => {
    return (
      <Container >
        {column.map(cell => 
          <Cell 
            cell={cell} 
            key={cell.id}
            placeShip={placeShip}
            handleHover={handleHover}
            shipFits={shipFits}
          />)}
      </Container>
    )
}

export default Column 