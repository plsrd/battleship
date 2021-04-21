import React from 'react'
import styled from 'styled-components'

const mainStyle = `
  height: 30px;
  width: 30px;
  border: 1px solid lightgrey;
  border-radius: 10px;
`

const HoverableContainer = styled.div`
  ${mainStyle}
  background-color: ${({hasShip, isHovering, shipFits}) => hasShip ? 'lightgrey' : isHovering && shipFits ? 'lightgreen' : isHovering && !shipFits ? 'pink' : 'white'} 
`
const ActiveContainer = styled.div`
  ${mainStyle}
  background-color: ${({hasShip, isHovering, shipFits}) => hasShip ? 'lightgrey' : isHovering && shipFits ? 'lightgreen' : isHovering && !shipFits ? 'pink' : 'white'};
  border: 1px solid ${({isShot, isHit}) => isHit ? 'red' :  isShot ? 'black' : 'lightgrey'}
`

const Cell = ({
  cell, 
  placeShip, 
  handleHover,
  shipFits,
  handleShot,
  active
  }) => {
    return (
      placeShip !== undefined ?
        <HoverableContainer
          onClick={() => placeShip(cell)}
          hasShip={cell.shipPiece !== ''}
          onMouseEnter={() => handleHover(cell, 'add')}
          onMouseLeave={() => handleHover(cell)}
          isHovering={cell.isHovering}
          shipFits={shipFits}
        />
      :
        // active ? 
        <ActiveContainer 
          hasShip={cell.shipPiece !== ''}
          onClick={() => handleShot(cell)}
          isShot={cell.isShot}
          isHit={cell.shipPiece.hit}
        /> 
        // :
        // <Container 
        //   hasShip={cell.shipPiece !== ''}
        // />
    )
}

export default Cell