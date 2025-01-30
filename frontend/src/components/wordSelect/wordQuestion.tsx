import { Card, CardContent, CardHeader } from "../ui/card"
import FillInQuestion from "./Question"

type SelectProps = {
    colorHeading: string,
    questions: Question[]
}

const WordSelect = ({colorHeading, questions}: SelectProps) => {
    return (
        <Card className='flex flex-col items-center'>
            <CardHeader>
                <h1 className='font-bold text-[2em]'>{colorHeading}</h1>
            </CardHeader>
            <CardContent className='flex flex-col gap-10 w-[90%]'>
                {questions.map((question, idx) => {
                    return (
                        <FillInQuestion key={idx} question={question}/>
                    )
                })}
            </CardContent>
        </Card>
    )
}

export default WordSelect