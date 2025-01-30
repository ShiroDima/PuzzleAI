"use client"
import { useGameInfo } from "@/lib/GameContext"
import WordSelect from "./wordSelect/wordQuestion"
import Puzzle from "./wordPuzzle/Puzzle"
import { questionCards } from "@/lib/constants"

const Game = () => {
    const {state} = useGameInfo()
    return (
        <div className='grid grid-cols-3 gap-5 w-[90%] h-[90%] my-5'>
            {questionCards.map((card, idx) => {
                return (
                    <WordSelect key={idx} colorHeading={card.heading} questions={card.questions} />
                )
            })}
            <Puzzle />
        </div>
    )
}


export default Game