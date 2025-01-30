import { Button } from "../ui/button"

type ButtonProps = {
    letter: string
}

const PuzzleButton = ({letter}: ButtonProps) => {
    return (
        <Button className=''>{letter}</Button>
    )
}

export default PuzzleButton