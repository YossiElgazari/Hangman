import { createContext, useState, ReactNode } from "react";

// Type definition for the game state
type GameState = {
  word: {
    word: string;
    difficulty: string;
    hint: string;
    category: string;
  } | null;
  isGameStarted: boolean;
  score: number;
  gameStatus: "won" | "lost" | null;
  setGameStatus: (status: "won" | "lost" | null) => void;
  incrementScore: (points: number) => void;
  buyHint: () => boolean;
  startGame: (selectedWord: {
    word: string;
    difficulty: string;
    hint: string;
    category: string;
  }) => void;
  backToMain: () => void;
};

// Create context for game state
export const GameStateContext = createContext<GameState | undefined>(undefined);

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
  const [word, setWord] = useState<{
    word: string;
    difficulty: string;
    hint: string;
    category: string;
  } | null>(null); // State for the current word
  const [isGameStarted, setIsGameStarted] = useState(false); // State for game start status
  const [score, setScore] = useState(0); // State for the player's score
  const [gameStatus, setGameStatus] = useState<"won" | "lost" | null>(null); // State for the game status

  // Function to start a new game with the selected word
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

  // Function to return to the main menu and reset the game state
  const backToMain = () => {
    setWord(null);
    setIsGameStarted(false);
    setGameStatus(null);
    setScore(0);
  };

  // Function to increment the player's score
  const incrementScore = (points: number) => {
    setScore((prevScore) => prevScore + points);
  };

  // Function to handle buying a hint, deducting score if sufficient
  const buyHint = () => {
    if (score - 20 >= 0) {
      incrementScore(-20);
      return true;
    }
    return false;
  };

  return (
    <GameStateContext.Provider
      value={{
        word,
        score,
        isGameStarted,
        startGame,
        backToMain,
        incrementScore,
        gameStatus,
        buyHint,
        setGameStatus,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};
