'use client'

import { createContext, ReactNode, useContext, useReducer } from "react";
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
    solvePuzzle: () => {}
})


const GameProvider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)

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
    
    const value = {
        state,
        selectOption,
        startPuzzleSelection,
        endPuzzleSelection,
        puzzleSelectionProgress,
        selectAnswer,
        resetPuzzleState,
        resetQuestionState,
        solvePuzzle
    }

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )
}

export const useGameInfo = () => useContext(GameContext);

export default GameProvider