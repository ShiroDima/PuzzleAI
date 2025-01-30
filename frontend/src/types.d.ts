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

interface StateInterface {
    questions: Question[]
}

interface ActionInterface {
    action: string,
    payload: any
}

type GameContextType = {
    state: StateInterface
}