// import { questionCards } from "../lib/constants";
import { ActionType } from "../lib/constants";

export const INITIAL_STATE: StateInterface = {
    cardInfo: [],
    puzzle: [],
    difficulty: 'kindergarten',
    answerSelected: {
        isAnswerSelected: false,
        question: null,
        prevOption: null,
        option: null,
        currAnswer: ''
    },
    puzzleInfo: {
        position: {
            initialPosition: null,
            currentPosition: null,
            previsionPosition: null,
            direction: null
        },
        isSolveInProgess: false,
        selectedWords: '',
        solved: false,
        buttonRefs: new Map(),
        selectedButtons: []
    }
}


export const gameReducer = (state: StateInterface, action: Action): StateInterface => {
    // const {action} = payload

    switch(action.type){
        case ActionType.SELECT_DIFFICULTY:
            let {difficulty} = action.payload
            return {
                ...state,
                difficulty
            }

        case ActionType.OPTION_SELECTED:
            let {question, option} = action.payload
            return {
                ...state,
                answerSelected: {
                    ...state.answerSelected,
                    question,
                    option,
                    prevOption: state.answerSelected.option,
                    isAnswerSelected: false,
                    currAnswer: ''
                }
                // isAnswerSelected: !state.isAnswerSelected
            }
        case ActionType.ANSWER_SELECTED:
            let {answer} = action.payload

            return {
                ...state,
                answerSelected: {
                    ...state.answerSelected,
                    isAnswerSelected: true,
                    currAnswer: answer
                }
                // isAnswerSelected: !state.isAnswerSelected
            }

        case ActionType.PUZZLE_SELECTION_START:
            let {position, letter, cb} = action.payload
            let newRefs = new Map(state.puzzleInfo.buttonRefs)
            newRefs.set(`${position.row}, ${position.col}`, {callback: cb})
            return {
                ...state,
                puzzleInfo: {
                    ...state.puzzleInfo,
                    position: {
                        ...state.puzzleInfo.position,
                        currentPosition: position,
                        initialPosition: position
                    },
                    isSolveInProgess: true,
                    selectedWords: letter,
                    buttonRefs: newRefs,
                    selectedButtons: [
                        ...state.puzzleInfo.selectedButtons,
                        position
                    ],
                    
                }
            }
        case ActionType.SOLVED_PUZZLE:
            return {
                ...state,
                puzzleInfo: {
                    ...state.puzzleInfo,
                    solved: true
                }
            }

        case ActionType.PUZZLE_SELECTION_END:
            return {
                ...state,
                puzzleInfo: {
                    ...state.puzzleInfo,
                    isSolveInProgess: false,
                    position: {
                        ...state.puzzleInfo.position,
                        direction: null,
                        initialPosition: null,
                        currentPosition: null,
                        previsionPosition: null
                    },
                    buttonRefs: new Map(),
                    selectedButtons: []
                }
            }

        case ActionType.RESET_PUZZLE_STATE:
            return {
                ...state,
                puzzleInfo: INITIAL_STATE.puzzleInfo
            }
        
        case ActionType.RESET_QUESTION_STATE:
            return {
                ...state,
                answerSelected: INITIAL_STATE.answerSelected
            }

        case ActionType.GAME_DATA_CREATED:
            return {
                ...state,
                puzzle: action.payload.puzzle,
                cardInfo: action.payload.cardInfo
            }
        
        case ActionType.GAME_RESET:
            return {
                ...state,
                puzzle: [],
                cardInfo: []
            }
        
        case ActionType.PUZZLE_SELECTION_PROGRESS:
            let {position: pos, direction, letter: buttonLetter, cb: removeButton} = action.payload
            let refs = new Map(state.puzzleInfo.buttonRefs)
            refs.set(`${pos.row}, ${pos.col}`, {callback: removeButton})
            return {
                ...state,
                puzzleInfo: {
                    ...state.puzzleInfo,
                    position: {
                        ...state.puzzleInfo.position,
                        currentPosition: pos,
                        previsionPosition: state.puzzleInfo.position.currentPosition,
                        direction: direction ? direction : state.puzzleInfo.position.direction
                    },
                    selectedWords: state.puzzleInfo.selectedWords + buttonLetter,
                    buttonRefs: refs,
                    selectedButtons: [
                        ...state.puzzleInfo.selectedButtons,
                        pos
                    ]
                }
            }

        default:
            return state
    }
}