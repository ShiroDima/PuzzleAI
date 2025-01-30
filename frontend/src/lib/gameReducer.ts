import { fakeQuestions } from "./constants";

export const INITIAL_STATE = {
    questions: fakeQuestions
}


export const gameReducer = (state: StateInterface, payload: ActionInterface): StateInterface => {
    const {action} = payload

    switch(action){
        default:
            return state
    }
}