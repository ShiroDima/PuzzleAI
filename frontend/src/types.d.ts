// import { ActionType } from "./lib/constants"

type Options = {
    A?: string,
    B?: string,
    C?: string,
    D?: string
}

type Question = {
    num: number,
    question: string,
    options: Options
    answer: Options
}

type CardInfo = {
    heading: string,
    questions: Question[]
}

type Direction = 'Horizontal' | 'Vertical' | 'Diagonal' | null
type Position= {
    row: number,
    col: number
}

type PuzzleInfo = {
    puzzle: string[][],
    position: {
        initialPosition: null | Position,
        previsionPosition: null | Position,
        currentPosition: null | Position,
        direction: Direction
    },
    isSolveInProgess: boolean,
    selectedWords: string,
    solved: boolean,
    buttonRefs: Map<string, {callback: (action: string) => void}>
    selectedButtons: Position[]
}

interface StateInterface {
    cardInfo: CardInfo[],
    answerSelected: {
        isAnswerSelected: boolean,
        question: number | null,
        option: 'A' | 'B' | 'C' | 'D' | null
        prevOption: 'A' | 'B' | 'C' | 'D' | null,
        currAnswer: string
    }
    puzzleInfo: PuzzleInfo
}

const ActionType = {
    SOLVED_PUZZLE: 'SOLVED_PUZZLE',
    OPTION_SELECTED: 'OPTION_SELECTED',
    ANSWER_SELECTED: 'ANSWER_SELECTED',
    PUZZLE_SELECTION_START: 'PUZZLE_SELECTION_START',
    PUZZLE_SELECTION_END: 'PUZZLE_SELECTION_END',
    PUZZLE_SELECTION_PROGRESS: 'PUZZLE_SELECTION_PROGRESS',
    RESET_QUESTION_STATE: 'RESET_QUESTION_STATE',
    RESET_PUZZLE_STATE: 'RESET_PUZZLE_STATE',
} as const;

// export {ActionType}

type Action = 
    |  {type: typeof ActionType.SOLVED_PUZZLE}
    |  {type: typeof ActionType.OPTION_SELECTED; payload: {question: number | null, option: 'A' | 'B' | 'C' | 'D' | null}}
    | {type: typeof ActionType.PUZZLE_SELECTION_START; payload: {position: Position, letter: string, cb: (action: string) => void}}
    | {type: typeof ActionType.PUZZLE_SELECTION_END}
    | {type: typeof ActionType.PUZZLE_SELECTION_PROGRESS; payload: {position: Position, letter: string, cb: (action: string) => void, direction?: Direction}}
    | {type: typeof ActionType.ANSWER_SELECTED; payload: { answer: string}}
    | {type: typeof ActionType.RESET_PUZZLE_STATE}
    | {type: typeof ActionType.RESET_QUESTION_STATE}

type GameContextType = {
    state: StateInterface,
    selectOption: (questionNumber: number, option: 'A' | 'B' | 'C' | 'D' | null, answerSelected: boolean, answer: string) => void,
    startPuzzleSelection: (currentPosition: Position, letter: string, cb: (action: string) => void) => void,
    endPuzzleSelection: () => void,
    puzzleSelectionProgress: (position: Position, letter: string, cb: (action: string) => void, direction?: Direction) => void
    selectAnswer: (answer: string) => void
    resetPuzzleState: () => void,
    resetQuestionState: () => void,
    solvePuzzle: () => void
}