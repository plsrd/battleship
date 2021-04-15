import React, { useState } from 'react'
import styled from 'styled-components'

import createBoard from '../utils/gameboardFactory'
import createShips from '../utils/shipFactory'
import createComputerBoard from '../utils/computerBoardFactory'
import Column from "./Column"
import Shipyard from './Shipyard'

const Container = styled.div`
  width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
`

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const Button = styled.button`
  outline: none;
  height: 30px;
  border-radius: 10px;
  border: none;
  background-color: lightgreen;
`


const Gameboard = () => {
  const [computerBoard, setComputerBoard] = useState(createComputerBoard())
  const [playerBoard, setPlayerBoard] = useState(createBoard())
  const [playerShips, setPlayerShips] = useState(createShips())
  const [selectedShip, setSelectedShip] = useState(playerShips[0])
  const [shipFits, setShipFits] = useState(true)

  const replaceCell = (column, cell, startIndex, index) => {    
    let newCell = {
      ...cell,
      shipPiece: selectedShip.pieces[index === undefined ? startIndex : index]
    }
    
    column.splice(index === undefined ? startIndex : startIndex + index, 1, newCell)
  }

  const placeShip = (cell) => {
    let newBoard = playerBoard
    let newColumn = newBoard.columns[cell.id[0]]
    const startIndex = newColumn.findIndex(prevCell => prevCell.id === cell.id)
    const { pieces } = selectedShip

    if (selectedShip.rotation === 'vertical') {
      const cellsToFill = newColumn.slice(startIndex, startIndex + pieces.length)

      if (cellsToFill.filter(cell => cell.shipPiece === '').length !== pieces.length) { return } 

      cellsToFill.forEach((cell, index) => {
        replaceCell(newColumn, cell, startIndex, index)
      })

      newBoard = {
        columns: {
          ...newBoard.columns,
          [cell.id[0]]: newColumn
        }
      }
      
    } else {
      let columnsToFill = Object.keys(newBoard.columns)
      columnsToFill = columnsToFill.splice(columnsToFill.indexOf(cell.id[0]), pieces.length)

      if (columnsToFill.filter(column => newBoard.columns[column][startIndex].shipPiece === '').length !== pieces.length) { return }

      columnsToFill.forEach(column => {
        newColumn = newBoard.columns[column]
        replaceCell(newColumn, newBoard.columns[column][startIndex], startIndex)

        newBoard = {
          columns: {
            ...newBoard.columns,
            [column]: newColumn
          }
        }
      })
    }

    setPlayerBoard(newBoard)
    removeFromShipyard()
    setShipFits(true)
  }

  const removeFromShipyard = () => {
    const newShips = playerShips.slice()
    newShips.splice(newShips.indexOf(selectedShip), 1)
    setPlayerShips(newShips)
    newShips.length > 0 ? setSelectedShip(newShips[0]) : setSelectedShip({})
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
      if (playerShips.length === 0) return
      let newColumn = playerBoard.columns[cell.id[0]]
      const index = newColumn.findIndex(prevCell => prevCell.id === cell.id)
      const cellsToHover = newColumn.slice(index, index + selectedShip.pieces.length)

      if (cellsToHover.filter(cell => cell.shipPiece === '').length !== selectedShip.pieces.length) {
        setShipFits(false)
      } else {
        setShipFits(true)
      }

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
      if (playerShips.length === 0) return
      let columns = Object.keys(newBoard.columns)
      const startIndex = columns.indexOf(cell.id[0])
      const cellIndex = newBoard.columns[cell.id[0]].findIndex(prevCell => prevCell.id === cell.id)
      const columnsToHover = columns.slice(startIndex, startIndex + selectedShip.pieces.length)

      if (columnsToHover.filter(col => newBoard.columns[col][cellIndex].shipPiece === '').length !== selectedShip.pieces.length) {
        setShipFits(false)
      } else {
        setShipFits(true)
      }

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
            shipFits={shipFits}
          />
          ))}
      </ColumnContainer>
      {playerShips.length > 0 ? (
        <>
          <Shipyard ships={playerShips} selectShip={setSelectedShip}/>
          <InfoContainer>
            <div>
            Current Selection:
            {selectedShip.id}
            </div>
            <Button onClick={() => rotateShip()}>
            rotate
            </Button>
          </InfoContainer>
        </>
      )
      : (<Button>Start</Button>)}
      <ColumnContainer>
        {Object.keys(computerBoard.columns).map(column => (
          <Column 
            column={computerBoard.columns[column]} 
            key={column}
            selectedShip={selectedShip}
            placeShip={placeShip}
            handleHover={handleHover}
            shipFits={shipFits}
          />
          ))}
      </ColumnContainer>
    </Container>
  )
}

export default Gameboard