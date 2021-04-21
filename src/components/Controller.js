import React, { useState } from 'react'
import styled from 'styled-components'

import createShips from '../utils/shipFactory'

import Board from "./Board"

const Container = styled.div`
  display: flex;
  flex-direction: row;
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
  const [playerShips, setPlayerShips] = useState(createShips())
  const [computerShips, setComputerShips] = useState(createShips())

  const updateShips = (piece) => {
    let ship = turn === 'player' ? computerShips.find(ship => ship.id === piece.parent) : playerShips.find.find(ship => ship.id === piece.parent)
    let pieces = ship.pieces.slice()
    let newPiece =  {
      ...piece,
      hit: true
    }

    pieces.splice(pieces.findIndex(prevPiece => prevPiece.id === piece.id), 1, newPiece)
    ship = {
      ...ship, 
      pieces: pieces
    }

    let newShips = turn === 'player' ? computerShips : playerShips
    newShips.splice(newShips.findIndex(ship => ship.id === piece.parent), 1, ship)
    turn === 'player' ? setComputerShips(newShips) : setPlayerShips(newShips)
  }

  const handleShot = (cell) => {
    const isHit = cell.shipPiece !== ''
    if (isHit) { updateShips(cell.shipPiece) }
    setShot({location: cell.id, status: isHit ? 'hit' : 'miss'})
    let newBoard = turn === 'player' ? computerBoard : playerBoard
    let newColumn = newBoard.columns[cell.id[0]].slice()
    let newCell = isHit ? 
      {
        ...cell,
        shipPiece: {
          ...cell.shipPiece,
          hit: isHit
        },
        isShot: true
      }
    : {
      ...cell,
      isShot: true
    }

    newColumn.splice(newColumn.findIndex(cell => cell.id === newCell.id), 1, newCell)
    newBoard = {
      columns: {
        ...newBoard.columns,
        [cell.id[0]] : newColumn
      }
    }

    if (turn === 'player') {
      setComputerBoard(newBoard)
      //setTurn('computer')
    } else {
      setPlayerBoard(newBoard)
      //setTurn('player')
    }
  }
  
  return (
    <Container>
      <Board 
        board={computerBoard}
        handleShot={handleShot}
        active={true}
      />
      <Board 
        board={playerBoard}
      />
      <div>
        <h1>{shot.location}</h1>
        <h1>{shot.status}</h1>
        <h1>{turn}</h1>
      </div>
    </Container>
  )
}

export default Controller
