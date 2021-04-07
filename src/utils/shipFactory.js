const createShip = (name, length) => {
  let pieces = []
  for (let i = 1; i <= length; i++){
    pieces = [
      ...pieces,
      {
        id: `${name}${i}`,
        hit: false
      }
    ]
  }
  return pieces
}


const shipFactory = () => {
 let ships = [
    { 
      id: 'cruiser',
      pieces: createShip('carrier', 5)
    },
    {
      id: 'battleship',
      pieces: createShip('battleship', 4)
    },
    {
      id:'carrier',
      pieces: createShip('carrier', 3)
    },
    {
      id:'submarine',
      pieces: createShip('submarine', 3)
    },
    {
      id:'destroyer',
      pieces: createShip('destroyer', 2)
    },
  ]

  return ships
}

export default shipFactory