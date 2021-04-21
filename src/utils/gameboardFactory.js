const board = () => {

  const createCells = (id) => {
    const newColumn = []
      for (let i = 1; i <= 10; i++) {
        newColumn.push(
          {
            id: `${id}${i}`,
            shipPiece:'',
            isShot: false,
            isHovering: false
          }
        )
      }
    return newColumn
  }

  let board = {columns:{}}
  const headers = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

  headers.forEach(header => {
    const newCells = createCells(header)
    const newBoard = {
      columns: {
        ...board.columns,
        [header]: newCells
      }
    }
    board = newBoard
  })

  return board
}

export default board