import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { CircleAlert } from "lucide-react"
import { useEffect } from "react"

const UserAlert = ({desc, resetClickCount}: {desc: string, resetClickCount: () => void}) => {

    useEffect(() => {
        let timeoutId = setTimeout(() => resetClickCount(), 2000)

        return () => clearTimeout(timeoutId)
    }, [resetClickCount])

    return (
        <Alert className='absolute flex gap-2 top-3 right-5 w-[500px] bg-red-300'>
            <div className='h-full flex place-content-center'><CircleAlert className='w-10 h-10' /></div>
            <div>
                <AlertTitle className='text-[1.5em] font-semibold'>Heads up!</AlertTitle>
                <AlertDescription>{desc}</AlertDescription>
            </div>
        </Alert>
    )
}

export default UserAlert