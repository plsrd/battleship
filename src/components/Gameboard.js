import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import createBoard from '../utils/gameboardFactory'
import createShips from '../utils/shipFactory'
import Column from "./Column"
import Shipyard from './Shipyard'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
`


const Gameboard = () => {
  const [playerBoard, setPlayerBoard] = useState(createBoard())
  const [playerShips, setPlayerShips] = useState(createShips())
  const [selectedShip, setSelectedShip] = useState(playerShips.find(ship => ship.id === 'cruiser'))

 const placeShip = (column, cell, ship) => {
  let newBoard = playerBoard
  let newColumn = newBoard.columns[column]
  const startIndex = newColumn.indexOf(cell)
  const cellsToFill = newColumn.slice(startIndex, startIndex + ship.pieces.length)
  if (cellsToFill.length !== ship.pieces.length) { 
    return
  } else {
      cellsToFill.forEach((cell, index) => {
      let newCell = cell
      
      newCell = {
        ...newCell,
        shipPiece: ship.pieces[index]
      }
      
      newColumn.splice(startIndex + index, 1, newCell)
      })

      newBoard = {
        columns: {
          ...newBoard.columns,
          [column]: newColumn
        }
      }
      setPlayerBoard(newBoard)

      removeFromShipyard()
  }
  }

 const removeFromShipyard =  () => {
  const newShips = playerShips.slice()
  newShips.splice(newShips.indexOf(selectedShip), 1)
  setPlayerShips(newShips)
 }

 const selectShip = (ship) => {
   setSelectedShip(ship)
 }



  return (
    <Container>
      <ColumnContainer>
        {Object.keys(playerBoard.columns).map(column => (
          <Column 
            column={playerBoard.columns[column]} 
            key={column}
            selectedShip={selectedShip}
            placeShip={placeShip}
          />
          ))}
      </ColumnContainer>
      <Shipyard ships={playerShips} selectShip={selectShip}/>
    </Container>
  )

}

export default Gameboard