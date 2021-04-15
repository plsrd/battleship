import createBoard from './gameboardFactory'
import shipFactory from './shipFactory'

const getRandomNumber = (length) => {
  return Math.round(Math.random() * (9 - length))
}

const getCellsToFill = (column, length) => {
  const startIndex = getRandomNumber(length)
  return column.slice(startIndex, startIndex + length)
}

const computerBoard = () => {
  let computerBoard =  createBoard()
  let ships = shipFactory()

  const { columns } = computerBoard

  ships.forEach(ship => {
    let selectedColumn = columns[Object.keys(columns)[getRandomNumber(0)]]

    const cellsToFill = getCellsToFill(selectedColumn, ship.pieces.length)
    console.log(cellsToFill)

  })

}

export default computerBoard