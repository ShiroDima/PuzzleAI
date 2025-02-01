"use server"

import axios from "axios"


const startNewGame = async () => {
    const {data} = await axios.get('http://127.0.0.1:8000/game')

    return data
}

export default startNewGame