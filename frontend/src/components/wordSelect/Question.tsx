"use client"
// type QuestionProps = {}

import { ReactNode, useState, useEffect, SetStateAction, Dispatch } from "react"
import { Button } from "../ui/button"
import { useGameInfo } from "@/context/GameContext"
import { cn } from "@/lib/utils"

interface ButtonProps {
    children: ReactNode,
    answer: Options,
    optionValue: string,
    optionLetter: 'A' | 'B' | 'C' | 'D',
    questionNumber: number,
    updateClickCount: () => void,
    isQuestionSolved: boolean
}

interface InputProps {
    questionString: string, 
    option: Options,
    questionNumber: number,
    isQuestionSolved: boolean
}

const FillInInput = ({questionString, option, questionNumber, isQuestionSolved}: InputProps) => {
    const {state: {answerSelected: {isAnswerSelected, option: optionValue, question}}} = useGameInfo()
    let splitQuestion = questionString.split("____")
    const [value, setValue] = useState<string>('')

    useEffect(() => {
        // if(question === question){
        //     isAnswerSelected && question === questionNumber ? setValue(option[optionValue as keyof Options] as string) : setValue('')
        // }
        if(!isQuestionSolved) isAnswerSelected && question === questionNumber ? setValue(option[optionValue as keyof Options] as string) : setValue('')
    }, [isAnswerSelected])

    return (
        <span className='text-sm flex flex-wrap leading-8 gap-2 justify-start max-h-24 h-14'>
            <p className='w-full'>
                {splitQuestion[0].trim()}
                <input 
                    type={'text'}
                    disabled
                    value={value}
                    className='w-[100px] place-items-center disabled:bg-transparent mx-2 border-b-[1px] border-black focus:outline-none focus-within:outline-none'
                />
                {/* <span className="mx-2">________</span> */}
                {splitQuestion[1].trim()}
            </p>
        </span>
    )
}

const FillInButton = ({children, isQuestionSolved, answer, optionValue, optionLetter, questionNumber, updateClickCount}: ButtonProps) => {
    const [isClicked, setIsClicked] = useState<boolean>(false)
    const [isAnswer, setIsAnswer] = useState<boolean>(false)
    const {state: {answerSelected}, selectOption, selectAnswer} = useGameInfo()
    const [[answerLetter, answerVal]] = Object.entries(answer).filter((val) => val[1] !== null)

    // Check if there is a previously selected answer
    // If there is, check if the question it is for, is the same as the one for this button that is clicked.
    // If it is, allow the click to happen, otherwise, update the click count.
    // After the click count reaches a certain number, then show a dialog that basically shows them the help
    useEffect(() => {
        if(answerSelected.question && !isQuestionSolved){
            if(answerSelected.question === questionNumber){
                // console.info(answerSelected.prevOption, optionLetter, isClicked)
                if(answerSelected.prevOption === optionLetter) {
                    setIsClicked(false)
                    setIsAnswer(false)
                }
            } // prevState => !prevState
        }
    }, [answerSelected.option])

    const hasBeenClicked = () => {
        // 1. Check if there is a previously selected answer
        // console.log(optionLetter)
        if(isQuestionSolved) return
        if(answerSelected.question){ // if question is not null, then no answer has been selected before and so the checks inside the block do not need to be run
            if(answerSelected.question !== questionNumber || answerSelected.option === optionLetter) {
                updateClickCount()
                // console.log(clickCount)
                return
            } // if the questions are not the same, then do not allow the click to go throw
            // 
        }
        if(answerSelected.option){
            if(answerSelected.option === optionLetter) {
                updateClickCount()
                // console.log(clickCount)
                return
            }
        }
        setIsClicked(true) // set that this particular button has been clicked
        // if the optionLetter is the same as the answerLetter, that means that the selected option is correct
        setIsAnswer(optionLetter===answerLetter)
        selectOption(questionNumber, optionLetter, optionLetter===answerLetter, optionValue)
        if(optionLetter===answerLetter){
            console.log(`Option Letter - ${optionLetter} | Answer Letter - ${answerLetter} | Answer selected - ${answerVal}`)
            console.log(answer)
            selectAnswer(answerVal)
        }
    }

    return (
        <Button 
            className={cn('text-black shadow-none bg-transparent hover:bg-transparent', {
                'bg-green-500 hover:bg-green-500': isClicked && isAnswer,
                'bg-red-500 hover:bg-red-500': isClicked && !isAnswer
            },
        )}
            onClick={hasBeenClicked}
        >
            {children}
        </Button>
    )
}

const FillInQuestion = ({question: {question, num, answer, options}, setClickCount}: {question: Question, setClickCount: Dispatch<SetStateAction<number>>}) => {
    const [isFrozen, setIsFrozen] = useState<boolean>(false)
    const {state: {puzzleInfo: {solved}, answerSelected: {question: questionNumber}}, resetQuestionState, resetPuzzleState} = useGameInfo()

    useEffect(() => {
        if(solved){
            questionNumber===num ? setIsFrozen(true) : null
            resetQuestionState()
            resetPuzzleState()
        }
    }, [solved])

    return (
        <div className='flex flex-col gap-2 w-full'>
            <div>
                <div className='flex gap-4 items-center'>
                    <span>
                        {num}.
                    </span>
                    <FillInInput isQuestionSolved={isFrozen} questionString={question} option={options} questionNumber={num}/>
                </div> 
            </div>
            <div className='flex gap-1 w-fit flex-wrap'>
                {Object.keys(options).map((val, idx) => {
                    return (
                        <FillInButton isQuestionSolved={isFrozen} updateClickCount={() => setClickCount(prev => prev + 1)} key={idx} questionNumber={num} answer={answer} optionLetter={val as 'A' | 'B' | 'C' | 'D'} optionValue={options[val as keyof Options] as string}>
                            <div key={idx} className='flex gap-2'>
                                <span>{val}.</span>
                                <span>{options[val as keyof Options]}</span>
                            </div>
                        </FillInButton>
                    )
                })}
            </div>
        </div>
    )
}


export default FillInQuestion