import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Piece = styled.div`
  box-sizing: border-box;
  height: 30px;
  width: 30px;
  background-color: lightgreen;
  border: 1px solid lightgrey;
`

const Ship = ({ship}) => {

  return (
    <Container>
      {ship.pieces.map(piece => <Piece />)}
    </Container>
  )
}

export default Ship