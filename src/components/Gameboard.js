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

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const RotateButton = styled.button`
  outline: none;
  height: 30px;
  border-radius: 10px;
  border: none;
  background-color: lightgreen;
`


const Gameboard = () => {
  const [playerBoard, setPlayerBoard] = useState(createBoard())
  const [playerShips, setPlayerShips] = useState(createShips())
  const [selectedShip, setSelectedShip] = useState(playerShips[0])

  const replaceCell = (column, cell, ship, index, startIndex) => {
    let newCell = cell
        
    newCell = {
      ...newCell,
      shipPiece: ship.pieces[index]
    }
    
    column.splice(startIndex + index, 1, newCell)
  }

  const placeShip = (column, cell, ship) => {
    let newBoard = playerBoard
    let newColumn = newBoard.columns[column]
    const startIndex = newColumn.indexOf(cell)
    if (ship.rotation === 'vertical') {
      const cellsToFill = newColumn.slice(startIndex, startIndex + ship.pieces.length)
      if (cellsToFill.length !== ship.pieces.length) {
        return
      } else {
        cellsToFill.forEach((cell, index) => {
          replaceCell(newColumn, cell, ship, index, startIndex)
        })

        newBoard = {
          columns: {
            ...newBoard.columns,
            [column]: newColumn
          }
        }
        setPlayerBoard(newBoard)
        removeFromShipyard(ship)
      }
    } else {
      console.log(newColumn, startIndex, cell)
    }
  }

 const removeFromShipyard = (ship) => {
  const newShips = playerShips.slice()
  newShips.splice(newShips.indexOf(ship), 1)
  setPlayerShips(newShips)
  newShips.length > 0 ? setSelectedShip(newShips[0]) : setSelectedShip({})
 }

 const selectShip = (ship) => {
   setSelectedShip(ship)
 }

 const rotateShip = () => {
  let newShips = playerShips
  let newShip = selectedShip
  newShip = {
    ...newShip,
    rotation: newShip.rotation === 'vertical' ? 'horizontal' : 'vertical'
  }
  newShips.splice(newShips.indexOf(selectedShip), 1, newShip)
  setPlayerShips(newShips)
  setSelectedShip(newShip)
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
      <InfoContainer>
        <div>
        Current Selection:
        {selectedShip.id}
        </div>
        <RotateButton onClick={() => rotateShip()}>
          rotate
        </RotateButton>
        
      </InfoContainer>
    </Container>
  )

}

export default Gameboard