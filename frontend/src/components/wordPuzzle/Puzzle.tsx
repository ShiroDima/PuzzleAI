import { MouseEventHandler, ReactNode, useState, useEffect, SetStateAction, Dispatch } from "react"
import { Card, CardContent, CardHeader } from "../ui/card"
import { useGameInfo } from "@/context/GameContext"
import { Button } from "../ui/button"
import validateDirection from "@/lib/validateDirection"
import UserAlert from "../UserAlert"
import { cn } from "@/lib/utils"

type PuzzleRowProps = {
    row: string[]
    rowIndex: number
    updateClickCount: () => void
}

type PuzzleButtonProps = {
    letter: string
    row: number
    col: number,
    updateClickCount: () => void
}

const getDirection = (currentPos: Position, initPos: Position): Direction => {
    if(currentPos.row === initPos.row){
        return 'Horizontal'
    }
    if(currentPos.col === initPos.col){
        return 'Vertical'
    }
    return 'Diagonal'
}


const PuzzleButton = ({letter, row, col, updateClickCount}: PuzzleButtonProps) => {
    const position: Position = {row, col}
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const [isFrozen, setIsFrozen] = useState<boolean>(false)
    const {state: {puzzleInfo: {isSolveInProgess, position: pos, buttonRefs, selectedButtons, selectedWords}, answerSelected: {isAnswerSelected, currAnswer}}, startPuzzleSelection, solvePuzzle, endPuzzleSelection, puzzleSelectionProgress} = useGameInfo()

    const handleSelectionStart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault()
        if(!isAnswerSelected){
            updateClickCount()
            return
        }
        if(isFrozen){
            updateClickCount()
            return
        }
        setIsSelected(true)
        startPuzzleSelection(position, letter, (action: string) => {
            console.log('Resetting button'); 
            if(action.toUpperCase() === 'RESET') setIsSelected(false);
            if(action.toUpperCase() === 'FREEZE') setIsFrozen(true)
        })
    }

    const handleSelectionProgress: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault()
        if(isSelected || isFrozen) return
        if(isSolveInProgess){
            if(!pos.direction){
                let direction = getDirection(position, pos.initialPosition as Position)
                puzzleSelectionProgress(position, letter, (action: string) => {
                    console.log('Resetting button'); 
                    if(action.toUpperCase() === 'RESET') setIsSelected(false);
                    if(action.toUpperCase() === 'FREEZE') setIsFrozen(true)
                }, direction)
                setIsSelected(true)
                return
            }
    
            let isValidDirection = validateDirection(pos.initialPosition as Position, pos.currentPosition as Position, position, pos.direction)
    
            // console.log(`PREV DIRECTION: ${pos.previsionPosition} CURRENT DIRECTION: ${position} - DIRECTION: ${pos.direction} - IS VALID DIRECTION: ${isValidDirection}`)
            if(isValidDirection){
                setIsSelected(true)
                puzzleSelectionProgress(position, letter, (action: string) => {
                    console.log('Resetting button'); 
                    if(action.toUpperCase() === 'RESET') setIsSelected(false);
                    if(action.toUpperCase() === 'FREEZE') setIsFrozen(true)
                })
            }
        }
        
    }

    const handleSelectionEnd: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault()
        if(currAnswer !== selectedWords.toLowerCase()) {
            selectedButtons.forEach(pos => {
                let key = `${pos.row}, ${pos.col}`
                buttonRefs.get(key)?.callback('reset')
            })
        }
        else {
            selectedButtons.forEach(pos => {
                let key = `${pos.row}, ${pos.col}`
                buttonRefs.get(key)?.callback('freeze')
            })
            solvePuzzle()
        }
        endPuzzleSelection()
        
        // console.log('Puzzle selection is done')
        console.log(`CURRENT WORD - ${currAnswer} SELECTED WORD - ${selectedWords}`)
    }
    
    return (
        <Button 
            className={cn('bg-white text-black hover:bg-slate-400 flex place-content-center w-full', {
                'bg-red-500 hover:bg-red-500': isSelected && !isSolveInProgess,
                'bg-green-500 hover:bg-green-500': isSelected
            })}
            onMouseDown={handleSelectionStart}
            onMouseEnter={handleSelectionProgress}
            onMouseUp={handleSelectionEnd}
        >
            {letter}
        </Button>
    )
}

const PuzzleRow = ({row, rowIndex, updateClickCount}: PuzzleRowProps) => {
    return (
        <div className='grid grid-cols-10 gap-1'>
            {row.map((r, i) => {
                return (
                    <PuzzleButton updateClickCount={updateClickCount} row={rowIndex} col={i} key={i} letter={r} />
                )
            })}
        </div>
    )
}

const Puzzle = () => {
    const [clickCount, setClickCount] = useState<number>(0)
    const {state: {puzzle}} = useGameInfo()

    return (
        <>
            <Card className='col-span-1 flex place-content-center bg-linear-to-r from-cyan-500 to-blue-500'>
                <CardContent className="w-full h-full p-2 grid grid-rows-10 gap-1">
                    {puzzle.map((row, idx) => {
                        return (
                            <PuzzleRow key={idx} updateClickCount={() => setClickCount(prev => prev+1)} row={row} rowIndex={idx} />
                        )
                    })}
                </CardContent>
            </Card>
            {clickCount === 2 && <UserAlert resetClickCount={() => setClickCount(0)} desc={'Please answer a question first before attempting the puzzle'} />}
        </>
    )
}

export default Puzzle