import { questionCards } from "../lib/constants";
import { ActionType } from "../lib/constants";

export const INITIAL_STATE: StateInterface = {
    cardInfo: questionCards,
    answerSelected: {
        isAnswerSelected: false,
        question: null,
        prevOption: null,
        option: null,
        currAnswer: ''
    },
    puzzleInfo: {
        puzzle: [
            [
                "M",
                "T",
                "H",
                "A",
                "V",
                "E",
                "Y",
                "R",
            ],
            [
                "Q",
                "R",
                "A",
                "I",
                "N",
                "B",
                "O",
                "W",
            ],
            [
                "K",
                "X",
                "D",
                "I",
                "G",
                "I",
                "V",
                "E",
            ],
            [
                "A",
                "H",
                "C",
                "K",
                "H",
                "O",
                "U",
                "S",
            ],
            [
                "R",
                "A",
                "G",
                "U",
                "I",
                "T",
                "A",
                "R",
            ],
            [
                "E",
                "J",
                "V",
                "U",
                "L",
                "P",
                "Y",
                "W",
            ],
            [
                "L",
                "C",
                "P",
                "T",
                "R",
                "E",
                "E",
                "F",
            ],
            [
                "E",
                "H",
                "I",
                "U",
                "J",
                "L",
                "J",
                "K",
            ],
        ],
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