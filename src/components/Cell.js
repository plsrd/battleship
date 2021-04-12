import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 40px;
  width: 40px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  background-color: ${({hasShip, isHovering, shipFits}) => hasShip ? 'lightgrey' : isHovering && shipFits ? 'lightgreen' : isHovering && !shipFits ? 'pink' : 'white'} 
`


const Cell = ({
  cell, 
  selectedShip,
  placeShip, 
  handleHover,
  shipFits }) => {
    return (
      <Container
        onClick={() => placeShip(cell.id[0], cell, selectedShip)}
        hasShip={cell.shipPiece !== ''}
        onMouseEnter={() => handleHover(cell, 'add')}
        onMouseLeave={() => handleHover(cell)}
        isHovering={cell.isHovering}
        shipFits={shipFits}
      >
        {cell.id}
      </Container>
    )
}

export default Cell