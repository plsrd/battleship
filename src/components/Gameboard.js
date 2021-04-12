import React, { useState } from 'react'
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

  const replaceCell = (column, cell, ship, startIndex, index) => {
    let newCell = cell
        
    newCell = {
      ...newCell,
      shipPiece: ship.pieces[index === undefined ? startIndex : index]
    }
    
    column.splice(index === undefined ? startIndex : startIndex + index, 1, newCell)
  }

  const placeShip = (column, cell, ship) => {
    let newBoard = playerBoard
    let newColumn = newBoard.columns[column]
    const startIndex = newColumn.findIndex(prevCell => prevCell.id === cell.id)

    if (ship.rotation === 'vertical') {
      const cellsToFill = newColumn.slice(startIndex, startIndex + ship.pieces.length)

      if (cellsToFill.length !== ship.pieces.length) { return } 

      cellsToFill.forEach((cell, index) => {
        replaceCell(newColumn, cell, ship, startIndex, index)
      })

      newBoard = {
        columns: {
          ...newBoard.columns,
          [column]: newColumn
        }
      }

      setPlayerBoard(newBoard)
      removeFromShipyard(ship)
      
    } else {
      let columnsToFill = Object.keys(newBoard.columns)
      columnsToFill = columnsToFill.splice(columnsToFill.indexOf(column), ship.pieces.length)

      if (columnsToFill.length !== ship.pieces.length) { return }

      columnsToFill.forEach(col => {
        newColumn = newBoard.columns[col]
        replaceCell(newColumn, newBoard.columns[col][startIndex], ship, startIndex)

        newBoard = {
          columns: {
            ...newBoard.columns,
            [col]: newColumn
          }
        }
      })

      setPlayerBoard(newBoard)
      removeFromShipyard(ship)
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

  const handleHover = (cell, update) => {
    let newBoard = playerBoard

    if (selectedShip.rotation === 'vertical') {
      let newColumn = playerBoard.columns[cell.id[0]]
      const index = newColumn.findIndex(prevCell => prevCell.id === cell.id)
      const cellsToHover = newColumn.slice(index, index + selectedShip.pieces.length)

      cellsToHover.forEach(oldCell => {
        let newCell = {
          ...oldCell,
          isHovering: update === 'add' ? true : false
        }
        newColumn.splice(newColumn.indexOf(oldCell), 1, newCell)
      })

      newBoard = {
        columns: {
          ...playerBoard.columns,
          [cell.id[0]]: newColumn
        }
      }
      setPlayerBoard(newBoard)
    } else {
      let columns = Object.keys(newBoard.columns)
      const startIndex = columns.indexOf(cell.id[0])
      const cellIndex = newBoard.columns[cell.id[0]].findIndex(prevCell => prevCell.id === cell.id)
      const columnsToHover = columns.slice(startIndex, startIndex + selectedShip.pieces.length)
      columnsToHover.forEach(col => {
        let newColumn = newBoard.columns[col]
        let newCell = newColumn[cellIndex]

        newCell = {
          ...newCell,
          isHovering: update === 'add' ? true : false
        }

        newColumn.splice(cellIndex, 1, newCell)
        
        newBoard = {
          columns: {
            ...newBoard.columns,
            [col]: newColumn
          }
        }
      })
      setPlayerBoard(newBoard)
    }
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
            handleHover={handleHover}
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