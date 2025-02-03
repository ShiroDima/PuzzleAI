"use client"

import Header from '@/components/Header'
import Game from '@/components/Game';
import { useEffect, useMemo, useState } from 'react';
import startNewGame from './actions/newGame';
import { useGameInfo } from '@/context/GameContext';


const Home = () => {
  const {setGameData, state: {cardInfo, difficulty}, isGameSet, setIsGameSet, resetGameData} = useGameInfo()
  // const gameData = useMemo(() => {
  //   console.info('useMemo is running')
  //   startNewGame().then(data => {
  //     const {card_info: {card_infos: cardInfo}, puzzle_info: {grid: puzzle}} = data
  //     // console.log(puzzle)
  //     console.log(cardInfo)
  //     setGameData(cardInfo, puzzle)
  //   }).catch(console.log)
  // }, [cardInfo])
  useEffect(() => {
    if(isGameSet) return
    resetGameData()
    console.log('Fetching game data')
    startNewGame(difficulty).then(data => {
      const {card_info: {card_infos: cardInfo}, puzzle_info: {grid: puzzle}} = data
      // console.log(puzzle)
      console.log(cardInfo)
      setGameData(cardInfo, puzzle)
      setIsGameSet(true)
    }).catch(console.log)
  }, [isGameSet])
  return (
    <main className='w-[80%] h-full flex flex-col justify-center items-center'>
      <Header />
      {/* hello world */}
      <Game />
    </main>
  );
}

export default Home
