const createShip = (name, length) => {
  let pieces = []
  for (let i = 1; i <= length; i++){
    pieces = [
      ...pieces,
      {
        id: `${name}${i}`,
        parent: name,
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
      pieces: createShip('carrier', 5),
      rotation: 'vertical',
    },
    {
      id: 'battleship',
      pieces: createShip('battleship', 4),
      rotation: 'vertical',
    },
    {
      id:'carrier',
      pieces: createShip('carrier', 3),
      rotation: 'vertical',
    },
    {
      id:'submarine',
      pieces: createShip('submarine', 3),
      rotation: 'vertical',
    },
    {
      id:'destroyer',
      pieces: createShip('destroyer', 2),
      rotation: 'vertical',
    },
  ]

  return ships
}

export default shipFactory