import React from 'react'
import styled from 'styled-components'

import Ship from './Ship'

const ShipContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 200px;
  height: 150px;
  border: 1px solid lightgrey;
  margin-left: 100px;
`

const Shipyard = ({ships}) => {

  return (
    <ShipContainer>
      {Object.keys(ships).map(ship => <Ship ship={ships[ship]} key={ships[ship].id}/>)}
    </ShipContainer>
  )
}

export default Shipyard