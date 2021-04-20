import createBoard from './gameboardFactory'
import createShips from './shipFactory'

const getRandomNumber = (length) => {
  return Math.round(Math.random() * (9 - length))
}

const rotateRandomShips = (ships) => {
  const rotatedShips =  ships.map(
    ship => {
      Math.round(Math.random()) === 0 ? ship.rotation = 'vertical' : ship.rotation = 'horizontal'
      return ship
    })
  return rotatedShips
}

const computerBoard = () => {
  let computerBoard =  createBoard()
  let ships = rotateRandomShips(createShips())

  const getCellsToFill = (column, ship) => {
    const startIndex = getRandomNumber(ship.pieces.length)
    if(ship.rotation === 'vertical') { 
      return column.slice(startIndex, startIndex + ship.pieces.length)
    }

    let columns = Object.keys(computerBoard.columns)
    columns = columns.splice(columns.indexOf(column), ship.pieces.length)
    return ship.pieces.map((piece, index) => {
      return computerBoard.columns[columns[index]].find(cell => cell.id === `${columns[index]}${startIndex + 1}`)
    })
  }
  
  const getValidPlacement = (ship) => {
    let shipFits = true
    const selectedColumn = ship.rotation === 'vertical' 
    ? computerBoard.columns[Object.keys(computerBoard.columns)[getRandomNumber(0)]] 
    : Object.keys(computerBoard.columns)[getRandomNumber(ship.pieces.length)]

    const selectedCells = getCellsToFill(selectedColumn, ship)
    selectedCells.forEach(cell => {
      if (cell.shipPiece !== '') { shipFits = false}
    }) 
    shipFits ? placeShip(ship, selectedCells) : getValidPlacement(ship)
  }
  
  const placeShip = (ship, cells) => {
    if (ship.rotation === 'vertical') {
      const columnId = [cells[0].id[0]]
      let newColumn = computerBoard.columns[columnId].slice()
      ship.pieces.forEach((piece, index) => {
        let newCell = {
          ...cells[index],
          shipPiece: piece
        }
        newColumn.splice(newColumn.findIndex(cell => cell.id === cells[index].id), 1, newCell)
      })

      computerBoard = {
        columns: {
          ...computerBoard.columns,
          [columnId]: newColumn
        }
      }
    } else {
      const columnIndex = cells[0].id.slice(1) - 1
      ship.pieces.forEach((piece, index) => {
        let column = computerBoard.columns[cells[index].id[0]]
        let newCell = {
          ...column[columnIndex],
          shipPiece: piece
        }

        column.splice(column.findIndex(cell => cell.id === newCell.id), 1, newCell)

        computerBoard = {
          columns: {
            ...computerBoard.columns,
            [cells[index].id[0]]: column
          }
        }
      })
    }
  }

  ships.forEach((ship) => {
    getValidPlacement(ship)
  })

  return computerBoard
}

export default computerBoard