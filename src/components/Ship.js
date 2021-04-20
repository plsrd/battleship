import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: ${props => props.rotation === 'vertical' ? 'column' : 'row'};
`
const Piece = styled.div`
  box-sizing: border-box;
  height: 30px;
  width: 30px;
  background-color: lightgreen;
  border: 1px solid ${props => props.selected ? 'red' : 'lightgrey'} ;
`

const Ship = ({ship, selectShip, selected}) => {
  return (
    <Container 
      onClick={() => selectShip(ship)}
      rotation={ship.rotation}
    >
      {ship.pieces.map(piece => 
        <Piece 
          key={piece.id}
          selected={selected}
        />)}
    </Container>
  )
}

export default Ship