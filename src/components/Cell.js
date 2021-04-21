import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  background-color: ${({hasShip, isHovering, shipFits}) => hasShip ? 'lightgrey' : isHovering && shipFits ? 'lightgreen' : isHovering && !shipFits ? 'pink' : 'white'} 
`


const Cell = ({
  cell, 
  placeShip, 
  handleHover,
  shipFits,
  checkShot,
  active
  }) => {
    return (
      placeShip !== undefined ?
        <Container
          onClick={() => placeShip(cell)}
          hasShip={cell.shipPiece !== ''}
          onMouseEnter={() => handleHover(cell, 'add')}
          onMouseLeave={() => handleHover(cell)}
          isHovering={cell.isHovering}
          shipFits={shipFits}
        />
      :
        // active ? 
        <Container 
          hasShip={cell.shipPiece !== ''}
          onClick={() => checkShot(cell)}
        /> 
        // :
        // <Container 
        //   hasShip={cell.shipPiece !== ''}
        // />
    )
}

export default Cell