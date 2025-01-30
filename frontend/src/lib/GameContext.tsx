'use client'

import { createContext, ReactNode, useContext, useReducer } from "react";
import {gameReducer, INITIAL_STATE } from "./gameReducer";


const GameContext = createContext<GameContextType>({
    state: INITIAL_STATE
})


const GameProvider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)
    
    const value = {
        state,
 
    }

    return (
        <GameContext.Provider value={value} >
            {children}
        </GameContext.Provider>
    )
}

export const useGameInfo = () => useContext(GameContext);

export default GameProvider