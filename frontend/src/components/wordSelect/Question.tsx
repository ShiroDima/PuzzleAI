
// type QuestionProps = {}

import { ReactNode } from "react"
import { Button } from "../ui/button"

const FillInInput = ({questionString}: {questionString: string}) => {
    let splitQuestion = questionString.split("__")
    return (
        <span className='text-sm flex gap-2'>
            <span>{splitQuestion[0].trim()}</span>
            {/* <input 
                type={'text'}
                className='border-b-[1px] border-black p-2 focus:outline-none focus-within:outline-none'
            /> */}
            <span className="">________</span>
            <span>{splitQuestion[1].trim()}</span>
        </span>
    )
}

const FillInButton = ({children}: {children: ReactNode}) => {
    return (
        <Button 
            className='bg-transparent text-black hover:bg-transparent shadow-none'
            
        >
            {children}
        </Button>
    )
}

const FillInQuestion = ({question: {question, num, answer, options}}: {question: Question}) => {
    return (
        <div className='flex flex-col gap-5'>
            <div>
                <p className='flex gap-4 leading-8 items-center'>
                    <span>
                        {num}.
                    </span>
                    <FillInInput questionString={question}/>
                </p> 
            </div>
            <div className='flex gap-10'>
                {Object.keys(options).map((val, idx) => {
                    return (
                        <FillInButton>
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