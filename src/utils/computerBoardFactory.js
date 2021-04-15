import createBoard from './gameboardFactory'
import shipFactory from './shipFactory'


const computerBoard = () => {
  let computerBoard =  createBoard()
  let ships = shipFactory()

  const { columns } = computerBoard

  const getRandomNumber = () => {
    return Math.round(Math.random() * 9)
  }

  ships.forEach(ship => {
    
    let selectedColumn = columns[Object.keys(columns)[getRandomNumber()]]

    console.log(selectedColumn)

    //let cellsToFill = selectedColumn.slice(Math)
  })


}

export default computerBoard