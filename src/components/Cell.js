import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 40px;
  width: 40px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  background-color: ${({hasShip, isHovering}) => {
    if(hasShip && isHovering) {
      return 'pink'
    } else if (hasShip && !isHovering) {
      return 'lightgreen'
    } else if (isHovering) {
      return 'lightgrey'
    }
  }} 
`

const Cell = ({cell, selectedShip, placeShip, handleHover }) => {
  return (
    <Container
      onClick={() => placeShip(cell.id[0], cell, selectedShip)}
      hasShip={cell.shipPiece !== ''}
      onMouseEnter={() => handleHover(cell, 'add')}
      onMouseLeave={() => handleHover(cell)}
      isHovering={cell.isHovering}
    >
      {cell.id}
    </Container>
  )
}

export default Cell