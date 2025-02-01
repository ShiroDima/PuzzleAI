import { Dispatch, ReactNode, SetStateAction } from "react"
import { Card, CardContent, CardHeader } from "../ui/card"
import FillInQuestion from "./Question"

type SelectProps = {
    colorHeading: string,
    questions: Question[],
    setClickCount: Dispatch<SetStateAction<number>>,
    color: Color,
    children: ReactNode
}

const WordSelect = ({colorHeading, questions, setClickCount, color, children}: SelectProps) => {
    return (
        <>
            <Card className={`flex flex-col items-center h-full bg-linear-to-r from-[${color.start}] from-50% to-[${color.end}] to-50%`}>
                <CardHeader>
                    <h1 className='font-bold text-[2em]'>{colorHeading}</h1>
                </CardHeader>
                <CardContent className='flex flex-col gap-5 w-full'>
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