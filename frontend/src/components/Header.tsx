import { Button } from "./ui/button"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useGameInfo } from "@/context/GameContext"
// import { useState } from "react"

const Header = () => {
    const {changeDifficulty, state: {difficulty}, resetGameData} = useGameInfo()
    return (
        <div className='w-full h-[10%] flex place-content-between place-items-center p-5'>
            <div className='flex flex-col h-full'>
                <h1 className='font-bold uppercase'>Digging for the right verb</h1>
                <p>Directions: Click on the correct answer and then complete the puzzle for the letters.</p>
            </div>
            <div className='flex gap-5'>
                <div className='flex place-items-center'>
                    <h2 className='font-bold mr-3'>Choose a class:</h2>
                    <ToggleGroup type='single' value={difficulty} onValueChange={changeDifficulty}>
                        <ToggleGroupItem className="hover:bg-green-500/40 data-[state='on']:bg-green-500" value='kindergarten'>
                            <h3>Kindergaten 3 - 6</h3>
                        </ToggleGroupItem>
                        <ToggleGroupItem className="hover:bg-green-500/40 data-[state='on']:bg-green-500" value='elementary'>
                            <h3>Elementary 6 - 12</h3>
                        </ToggleGroupItem>
                        <ToggleGroupItem className="hover:bg-green-500/40 data-[state='on']:bg-green-500" value='mid-school'>
                            <h3>Middle School 12 - 15</h3>
                        </ToggleGroupItem>
                        <ToggleGroupItem className="hover:bg-green-500/40 data-[state='on']:bg-green-500" value='high-school'>
                            <h3>High School 15 - 18</h3>
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <Button onClick={resetGameData} className='bg-green-500 hover:bg-green-500'>New Game</Button>
            </div>
        </div>
    )
}

export default Header