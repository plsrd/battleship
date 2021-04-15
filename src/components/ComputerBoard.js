import React, { useState } from 'react'
import styled from 'styled-components'

import createBoard from '../utils/computerBoardFactory'

import Column from '../components/Column'
import Cell from '../components/Cell'

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const ComputerBoard = () =>  {
  const [computerBoard, setComputerBoard] = useState(createBoard())

  console.log(computerBoard)

  return (
    <ColumnContainer>
      {Object.keys(computerBoard.columns).map(column => (
          <Column 
            column={computerBoard.columns[column]} 
            key={column}
          />
      ))}
    </ColumnContainer>
  )
}

export default ComputerBoard