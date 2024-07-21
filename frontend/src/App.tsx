import React, { useState } from 'react';
import CategorySelector from './components/CategorySelector';
import GameBoard from './components/GameBoard';
import Scoreboard from './components/Scoreboard';
import LandingPage from './components/LandingPage';
import './index.css';

const App = () => {
  const [words, setWords] = useState<{ word: string, hint: string, category: string }[]>([]);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  return (
    <>
      {isGameStarted ? (
        <>
          <CategorySelector setWords={setWords} />
          <GameBoard words={words} />
          <Scoreboard />
        </>
      ) : (
        <LandingPage onStart={handleStartGame} />
      )}
    </>
  );
};

export default App;
