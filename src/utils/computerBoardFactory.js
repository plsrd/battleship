import Ship from '../components/Ship'
import createBoard from './gameboardFactory'
import shipFactory from './shipFactory'

const getRandomNumber = (length) => {
  return Math.round(Math.random() * (9 - length))
}

const getCellsToFill = (column, length) => {
  const startIndex = getRandomNumber(length)
  return column.slice(startIndex, startIndex + length)
}

const getValidPlacement = (board, ship) => {
  let selectedColumn = board.columns[Object.keys(board.columns)[getRandomNumber(0)]]
  let shipFits = true
  const selectedCells = getCellsToFill(selectedColumn, ship.pieces.length)
  selectedCells.forEach(cell => {
    if (cell.shipPiece !== '') { shipFits = false}
  }) 
  if (shipFits) {
    placeShip(ship, selectedCells)
  } else {
    getValidPlacement(board, ship.pieces.length)
  }
}

const placeShip = (ship, cells) => {
  console.log(ship, cells)
  ship.pieces.forEach((piece, index) => {
    let newCell = {
      ...cells[index],
      shipPiece: piece
    }
  })
}

const computerBoard = () => {
  let computerBoard =  createBoard()
  let ships = shipFactory()

  ships.forEach((ship) => {
    getValidPlacement(computerBoard, ship)
  })

  return computerBoard
}

export default computerBoard