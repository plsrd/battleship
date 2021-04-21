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
  checkShot,
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
                checkShot={checkShot}
                active={active}
              />
          )}
        </Container>

    )
}

export default Column 