"use client"
import { useGameInfo } from "@/context/GameContext"
import WordSelect from "./wordSelect/wordQuestion"
import Puzzle from "./wordPuzzle/Puzzle"
import { questionCards } from "@/lib/constants"
import { useState } from "react"
import UserAlert from "./UserAlert"

const Game = () => {
    const {state} = useGameInfo()
    const [clickCount, setClickCount] = useState<number>(0)
    return (
        <>
            <div className='grid static grid-cols-3 gap-5 w-[90%] h-[90%] grid-rows-2 auto-rows-[200px]'>
                {questionCards.map((card, idx) => {
                    return (
                        <WordSelect setClickCount={setClickCount} key={idx} colorHeading={card.heading} questions={card.questions}>
                            {clickCount === 2 && <UserAlert resetClickCount={() => setClickCount(0)} desc={'Please check the puzzle for the selected word and solve it before proceeding to another question'} />}
                        </WordSelect>
                    )
                })}
                <Puzzle />
                
            </div>
            
        </>
    )
}


export default Game