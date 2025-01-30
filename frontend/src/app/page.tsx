import Title from '@/components/Title'
import Game from '@/components/Game';

const Home = () => {
  return (
    <main className='w-[80%] h-full flex flex-col justify-center items-center'>
      <Title />
      {/* hello world */}
      <Game />
    </main>
  );
}

export default Home
