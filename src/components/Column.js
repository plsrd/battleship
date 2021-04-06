import React from 'react'
import styled from "styled-components"

import Cell from './Cell'

const Container = styled.div`
  display: flex;
  flex-direct: column;
`

const Column = ({column}) => {
  return (
    <Container >
      {column.map(cell => <Cell cell={cell}/>)}
    </Container>
  )
}

export default Column 