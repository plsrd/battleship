import React, { useState } from 'react'
import createBoard from '../utils/computerBoardFactory'

const ComputerBoard = () =>  {
  const [computerBoard, setComputerBoard] = useState(createBoard())

  return (
    <h1>Board</h1>
  )
}

export default ComputerBoard