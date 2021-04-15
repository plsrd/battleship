import createBoard from './gameboardFactory'
import shipFactory from './shipFactory'

const getRandomNumber = (length) => {
  return Math.round(Math.random() * (9 - length))
}

const computerBoard = () => {
  let computerBoard =  createBoard()
  let ships = shipFactory()

  const getCellsToFill = (column, length) => {
    const startIndex = getRandomNumber(length)
    return column.slice(startIndex, startIndex + length)
  }
  
  const getValidPlacement = (ship) => {
    if (ship.rotation === 'vertical') {
      let selectedColumn = computerBoard.columns[Object.keys(computerBoard.columns)[getRandomNumber(0)]]
      let shipFits = true
      const selectedCells = getCellsToFill(selectedColumn, ship.pieces.length)
      selectedCells.forEach(cell => {
        if (cell.shipPiece !== '') { shipFits = false}
      }) 

      shipFits ? placeShip(ship, selectedCells) : getValidPlacement(ship)
    }
  }
  
  const placeShip = (ship, cells) => {
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
  }

  ships.forEach((ship) => {
    getValidPlacement(ship)
  })

  return computerBoard
}

export default computerBoard