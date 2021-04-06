const createShip = (name, length) => {
  let pieces = []
  for (let i = 1; i <= length; i++){
    pieces = [
      ...pieces,
      `${name}${i}`
    ]
  }
  return pieces
}


const shipFactory = () => {
 let ships = {
   'carrier': {
     pieces: createShip('carrier', 5)
   },
   'battleship': {
    pieces: createShip('battleship', 4)
   },
   'cruiser': {
    pieces: createShip('cruiser', 3)
   },
   'submarine': {
    pieces: createShip('submarine', 3)
   },
   'destroyer': {
    pieces: createShip('destroyer', 2)
   },
 }

  return ships
}

export default shipFactory