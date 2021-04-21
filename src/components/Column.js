import React from 'react'
import styled from "styled-components"

import Cell from './Cell'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Column = ({
  column, 
  placeShip, 
  handleHover,
  shipFits,
  handleShot,
  active
  }) => {
    return (
        <Container >
          {column.map(cell => 
            placeShip !== undefined ?
              <Cell 
                cell={cell} 
                key={cell.id}
                placeShip={placeShip}
                handleHover={handleHover}
                shipFits={shipFits}
              />
            : 
              <Cell
                cell={cell}
                key={cell.id}
                handleShot={handleShot}
                active={active}
              />
          )}
        </Container>

    )
}

export default Column 