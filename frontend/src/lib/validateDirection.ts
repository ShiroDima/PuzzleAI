import { Direction } from "./constants"


const validateDirection = (initialPosition: Position, previousPosition: Position, currentPosition: Position, direction: Direction): boolean | undefined => {
    // For a horizontal direction -> initialPosition row must be same as current position row
	// For a vertical direction -> initialPosition column must be same as current position column
	// For a diagonal direction -> initial position and second position will be used
	if(direction===Direction.HORIZONTAL){
		console.log(initialPosition, currentPosition)
		return initialPosition.row === currentPosition.row
	}
	if(direction===Direction.VERTICAL){
		return initialPosition.col === currentPosition.col
	}
	if(direction===Direction.DIAGONAL){
		return !(previousPosition.row === currentPosition.row) && !(previousPosition.col === currentPosition.col) 
	}
}

export default validateDirection