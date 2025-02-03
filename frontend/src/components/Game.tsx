"use client"
import { useGameInfo } from "@/context/GameContext"
import WordSelect from "./wordSelect/wordQuestion"
import Puzzle from "./wordPuzzle/Puzzle"
// import { questionCards } from "@/lib/constants"
import { useState } from "react"
import UserAlert from "./UserAlert"
import { Skeleton } from '@/components/ui/skeleton';


const Game = () => {
    const {state: {cardInfo, puzzle}} = useGameInfo()
    const [clickCount, setClickCount] = useState<number>(0)
    return (
        <div className='w-full h-full'>
            {
                cardInfo.length !== 0 && puzzle.length !== 0 
                ? <div className='grid static grid-cols-3 gap-5 w-full h-[90%] grid-rows-[400px_400px] auto-rows-max '>
                        {cardInfo.map((card, idx) => {
                            return (
                                <WordSelect setClickCount={setClickCount} key={idx} colorHeading={card.heading} questions={card.questions} color={card.color}>
                                    {clickCount === 2 && <UserAlert resetClickCount={() => setClickCount(0)} desc={'Please check the puzzle for the selected word and solve it before proceeding to another question'} />}
                                </WordSelect>
                            )
                        })}
                        <Puzzle />
                        
                    </div>
                :
                <Skeleton className='w-full h-full' />
            }
            
        </div>
    )
}


export default Game