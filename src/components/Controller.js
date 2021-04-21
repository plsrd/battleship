import React, { useState } from 'react'
import styled from 'styled-components'

import Board from "./Board"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-around;
`

const Controller = ({
  playerBoard, 
  setPlayerBoard, 
  computerBoard, 
  setComputerBoard
  }) => {
  const [turn, setTurn] = useState('player')
  const [shot, setShot] = useState({})

  const checkShot = (cell) => {
    cell.shipPiece !== '' ? handleHit(cell) : setShot({location: cell, status: 'miss'})
  }

  const handleHit = (cell) => {
    setShot({location: cell, status: 'hit'})
    let newBoard = turn === 'player' ? playerBoard : computerBoard
    let newColumn = newBoard.columns[cell.id[0]]
    console.log(newColumn, cell.id)
  }

  console.log(shot)
  
  return (
    <Container>
      <Board 
        board={computerBoard}
        checkShot={checkShot}
        active={true}
      />
      <Board 
        board={playerBoard}
      />
    </Container>
  )
}

export default Controller
