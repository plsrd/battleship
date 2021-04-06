import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid lightgrey
`

const Cell = ({cell}) => {
  return (
    <Container>
      {cell.id}
    </Container>
  )
}

export default Cell