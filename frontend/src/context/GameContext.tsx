'use client'

import { createContext, ReactNode, useContext, useReducer, useState } from "react";
import {gameReducer, INITIAL_STATE } from "./gameReducer";
import { ActionType } from "@/lib/constants";


const GameContext = createContext<GameContextType>({
    state: INITIAL_STATE,
    selectOption: () => {},
    startPuzzleSelection: () => {},
    endPuzzleSelection: () => {},
    puzzleSelectionProgress: () => {},
    selectAnswer: () => {},
    resetPuzzleState: () => {},
    resetQuestionState: () => {},
    solvePuzzle: () => {},
    setGameData: () => {},
    changeDifficulty: () => {},
    isGameSet: false,
    setIsGameSet: () => {},
    resetGameData: () => {}
})


const GameProvider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)
    const [isGameSet, setIsGameSet] = useState<boolean>(false)

    const selectOption = (questionNumber: number, option: 'A' | 'B' | 'C' | 'D' | null, isAnswerSelected: boolean, answer: string) => {
        console.info(ActionType.OPTION_SELECTED)
        dispatch({
            type: ActionType.OPTION_SELECTED,
            payload: {question: questionNumber, option}
        })
    }

    const startPuzzleSelection = (currentPosition: Position, letter: string, cb: (action: string) => void): void => {
        console.info(ActionType.PUZZLE_SELECTION_START, currentPosition)

        dispatch({
            type: ActionType.PUZZLE_SELECTION_START,
            payload: {position: currentPosition, letter, cb}
        })
    }

    const endPuzzleSelection = () => {
        console.info(ActionType.PUZZLE_SELECTION_END)

        dispatch({
            type: ActionType.PUZZLE_SELECTION_END
        })
    }

    const resetPuzzleState = () => {
        console.info(ActionType.RESET_PUZZLE_STATE)

        dispatch({
            type: ActionType.RESET_PUZZLE_STATE
        })
    }

    const resetQuestionState = () => {
        console.info(ActionType.RESET_QUESTION_STATE)

        dispatch({
            type: ActionType.RESET_QUESTION_STATE
        })
    }

    const puzzleSelectionProgress = (position: Position, letter: string, cb: (action: string) => void, direction?: Direction) => {
        console.info(ActionType.PUZZLE_SELECTION_PROGRESS, position, letter, direction)

        direction ? dispatch({
            type: ActionType.PUZZLE_SELECTION_PROGRESS,
            payload: {position, letter, cb, direction}
        }) : dispatch({
            type: ActionType.PUZZLE_SELECTION_PROGRESS,
            payload: {position, cb, letter}
        })
    }

    const selectAnswer = (answer: string) => {
        console.info(ActionType.PUZZLE_SELECTION_PROGRESS, answer)

        dispatch({
            type: ActionType.ANSWER_SELECTED,
            payload: {answer}
        })
    }

    const solvePuzzle = () => {
        console.info(ActionType.SOLVED_PUZZLE,)

        dispatch({
            type: ActionType.SOLVED_PUZZLE,
        })
    }

    const setGameData = (cardInfo: CardInfo[], puzzle: string[][]) => {
        console.info(ActionType.GAME_DATA_CREATED,)

        dispatch({
            type: ActionType.GAME_DATA_CREATED,
            payload: {cardInfo, puzzle }
        })
    }

    const changeDifficulty = (difficulty: string) => {
        console.info(ActionType.SELECT_DIFFICULTY, difficulty)
        dispatch({
            type: ActionType.SELECT_DIFFICULTY,
            payload: { difficulty }
        })
        resetPuzzleState()
        resetQuestionState()
        setIsGameSet(false)
    }

    const resetGameData = () => {
        console.log(ActionType.GAME_RESET)

        dispatch({
            type: ActionType.GAME_RESET
        })

        isGameSet ? setIsGameSet(false) : null
    }
    
    const value = {
        state,
        selectOption,
        startPuzzleSelection,
        endPuzzleSelection,
        puzzleSelectionProgress,
        selectAnswer,
        resetPuzzleState,
        resetQuestionState,
        solvePuzzle,
        setGameData,
        changeDifficulty,
        isGameSet,
        setIsGameSet,
        resetGameData
    }

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )
}

export const useGameInfo = () => useContext(GameContext);

export default GameProvider