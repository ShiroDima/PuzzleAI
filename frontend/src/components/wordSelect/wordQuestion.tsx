import { Dispatch, ReactNode, SetStateAction } from "react"
import { Card, CardContent, CardHeader } from "../ui/card"
import FillInQuestion from "./Question"

type SelectProps = {
    colorHeading: string,
    questions: Question[],
    setClickCount: Dispatch<SetStateAction<number>>,
    children: ReactNode
}

const WordSelect = ({colorHeading, questions, setClickCount, children}: SelectProps) => {
    return (
        <>
            <Card className='flex flex-col items-center h-full'>
                <CardHeader>
                    <h1 className='font-bold text-[2em]'>{colorHeading}</h1>
                </CardHeader>
                <CardContent className='flex flex-col gap-10 w-full'>
                    {questions.map((question, idx) => {
                        return (
                            <FillInQuestion setClickCount={setClickCount} key={idx} question={question} />
                        )
                    })}
                </CardContent>
            </Card>
            {children}
        </>
    )
}

export default WordSelect