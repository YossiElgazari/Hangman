import { createContext, useState, ReactNode } from 'react';

type GameState = {
  word: {
    word: string;
    difficulty: string;
    hint: string;
    category: string;
  } | null;
  isGameStarted: boolean;
  startGame: (selectedWord: {
    word: string;
    difficulty: string;
    hint: string;
    category: string;
  }) => void;
  backToMain: () => void;
  score: number;
  incrementScore: (points: number) => void;
  resetScore: () => void;
};

export const GameStateContext = createContext<GameState | undefined>(undefined);

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
  const [word, setWord] = useState<{
    word: string;
    difficulty: string;
    hint: string;
    category: string;
  } | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [score, setScore] = useState(0);

  const startGame = (selectedWord: {
    word: string;
    difficulty: string;
    hint: string;
    category: string;
  }) => {
    setWord(selectedWord);
    setIsGameStarted(true);
  };

  const backToMain = () => {
    setWord(null);
    setIsGameStarted(false);
    setScore(0);
  };

  const incrementScore = (points: number) => {
    setScore(prevScore => prevScore + points);
  };

  const resetScore = () => {
    setScore(0);
  };

  return (
    <GameStateContext.Provider value={{ word, score, isGameStarted, startGame, backToMain, incrementScore, resetScore }}>
      {children}
    </GameStateContext.Provider>
  );
};
