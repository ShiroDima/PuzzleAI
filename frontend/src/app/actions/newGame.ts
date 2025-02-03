"use server"

import axios from "axios"


const startNewGame = async (mode: string) => {
    const {data} = await axios.get(`http://127.0.0.1:8000/game?difficulty=${mode}`)

    return data
}

export default startNewGame