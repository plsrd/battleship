import React, { useState } from 'react'
import styled from 'styled-components'

import Board from "./Board"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Controller = ({playerBoard, computerBoard}) => {

  return (
    <Container>
      <Board 
        board={playerBoard}
      />
      <Board 
        board={computerBoard}
      />
    </Container>
  )
}

export default Controller
