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
  gameStatus: 'won' | 'lost' | null;
  setGameStatus: (status: 'won' | 'lost' | null) => void;
  incrementScore: (points: number) => void;
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
  const [gameStatus, setGameStatus] = useState<'won' | 'lost' | null>(null);

  const startGame = (selectedWord: {
    word: string;
    difficulty: string;
    hint: string;
    category: string;
  }) => {
    setWord(selectedWord);
    setIsGameStarted(true);
    setGameStatus(null);
  };

  const backToMain = () => {
    setWord(null);
    setIsGameStarted(false);
    setGameStatus(null);
    setScore(0);
  };

  const incrementScore = (points: number) => {
    setScore(prevScore => prevScore + points);
  };

  return (
    <GameStateContext.Provider value={{ word, score, isGameStarted, startGame, backToMain, incrementScore,gameStatus, setGameStatus}}>
      {children}
    </GameStateContext.Provider>
  );
}
