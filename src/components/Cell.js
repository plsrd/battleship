import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 40px;
  width: 40px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  background-color: ${props => props.hasShip ? 'lightgreen' : 'white'}
`

const Cell = ({cell, selectedShip, placeShip}) => {
  return (
    <Container
      onClick={() => placeShip(cell.id[0], cell, selectedShip)}
      hasShip={cell.shipPiece !== ''}
    >
      {cell.id}
    </Container>
  )
}

export default Cell