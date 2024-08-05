import { useEffect } from "react";
import { useGameState } from "../hooks/useGameState";

type KeyboardProps = {
  onGuess: (letter: string) => void;
  guessedLetters: string[];
};

const Keyboard = ({ onGuess, guessedLetters }: KeyboardProps) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const { gameStatus } = useGameState();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (letters.includes(key) && !guessedLetters.includes(key.toLowerCase())) {
        onGuess(key.toLowerCase());
      }
    };

    // Add keydown event listener
    window.addEventListener("keydown", handleKeyPress);

    // Remove keydown event listener when game status changes or component unmounts
    if (gameStatus !== null) {
      window.removeEventListener("keydown", handleKeyPress);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [guessedLetters, onGuess, letters, gameStatus]);

  const renderButton = (letter: string) => (
    <div key={letter} className="flex justify-center items-center">
      <button
        className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-b from-gray-300 to-gray-500 dark:from-gray-700 dark:to-gray-900 border border-gray-500 dark:border-gray-700 rounded-md
          shadow-lg text-gray-100 dark:text-gray-200 font-semibold text-base sm:text-lg md:text-xl lg:text-2xl transition-transform duration-300 transform ${
            guessedLetters.includes(letter.toLowerCase())
              ? "opacity-50 cursor-default"
              : "hover:bg-gradient-to-b hover:from-gray-400 hover:to-gray-600 dark:hover:from-gray-800 dark:hover:to-gray-950 hover:scale-105 active:scale-95"
          }`}
        onClick={() => onGuess(letter.toLowerCase())}
        disabled={guessedLetters.includes(letter.toLowerCase())}
      >
        {letter}
      </button>
    </div>
  );

  return (
    <div className="flex justify-center items-center">
      <div className="bg-gray-300 dark:bg-gray-800 p-1 md:p-2 xl:p-4 border-2 border-gray-400 dark:border-gray-600 rounded-lg space-y-2 md:space-y-5">
        <div className="grid grid-cols-10 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
          {"QWERTYUIOP".split("").map(renderButton)}
        </div>
        <div className="grid grid-cols-9 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
          {"ASDFGHJKL".split("").map(renderButton)}
        </div>
        <div className="grid grid-cols-9 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
          <div></div>
          {"ZXCVBNM".split("").map(renderButton)}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
