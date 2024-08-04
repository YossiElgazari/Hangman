import { useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";
import Keyboard from "../components/Keyboard";
import { useGameState } from "../hooks/useGameState";
import { gsap } from "gsap";
import HintButton from "../components/HintButton";
import HintModal from "../components/HintModal";
import ScoreBar from "../components/ScoreBar";
import EndGameModal from "../components/EndGameModal";
import { fetchWordByCategory } from "../service/api";
import HangmanAnimation from "../components/HangmanAnimation";
import { Howl } from 'howler';

// Load the sound
const correctGuessSound = new Howl({
  src: ['/correct.mp3'], // Replace with your actual sound file path
});

const GamePage = () => {
  const { word, backToMain, startGame, gameStatus, setGameStatus } = useGameState();
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);

  const [isHintModalOpen, setIsHintModalOpen] = useState(false);
  const { incrementScore, score } = useGameState();

  useEffect(() => {
    const animationStartGamePage = () => {
      const tl = gsap.timeline({
        defaults: { duration: 1, opacity: 0, scale: 0.01 },
      });
      tl.set(".game-page", { opacity: 1, scale: 0.01 }).to(".game-page", {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
      });
    };

    animationStartGamePage();
  }, []);

  useEffect(() => {
    if (wrongGuesses >= 6) {
      setGameStatus("lost");
    } else if (
      word?.word
        .split("")
        .every(
          (char) =>
            guessedLetters.includes(char.toLowerCase()) ||
            char === " " ||
            char === "-"
        )
    ) {
      setGameStatus("won");
    }
  }, [guessedLetters, wrongGuesses, word, gameStatus, setGameStatus]);

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter.toLowerCase())) return; // Avoid repeated guesses

    const occurrences =
      word?.word
        .split("")
        .filter((char) => char.toLowerCase() === letter.toLowerCase()).length ||
      0;

    if (occurrences > 0) {
      setGuessedLetters([...guessedLetters, letter.toLowerCase()]);
      incrementScore(10 * occurrences); // Increment score by 10 for each occurrence
      correctGuessSound.play(); // Play the sound effect
    } else {
      setGuessedLetters([...guessedLetters, letter.toLowerCase()]);
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const handleNextWord = async () => {
    const nextWord = await fetchWordByCategory({
      category: "random",
      difficulty: "random",
    });
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus(null);
    startGame(nextWord);
  };

  if (!word) return null;

  return (
    <>
      <div className="game-page flex flex-col w-full h-[calc(100vh-56px)] p-4">
        <div className="flex flex-col justify-center items-center mt-10 md:mt-5 xl:mt-2 lg:mb-4">
          <div className="flex flex-row justify-center items-center">
            <p className="font-permanent tracking-[0.2em] text-headline2 font-semibold text-center text-gray-700 dark:text-secondary_dark50  mr-2">
              {word.category.toUpperCase()}
            </p>
            <HintButton openModal={() => setIsHintModalOpen(true)} />
          </div>
          <ScoreBar score={score} />
        </div>
        <div className="flex justify-around items-center flex-grow">
          <GameBoard word={word} guessedLetters={guessedLetters} />
          <HangmanAnimation wrongGuesses={wrongGuesses} /> 
        </div>
        <div className="flex justify-center items-center">
          <Keyboard onGuess={handleGuess} guessedLetters={guessedLetters} />
        </div>
      </div>
      {isHintModalOpen && (
        <HintModal hint={word.hint} onClose={() => setIsHintModalOpen(false)} />
      )}
      {gameStatus && (
        <EndGameModal
          gameStatus={gameStatus as "won" | "lost"}
          word={word.word}
          onNextWord={handleNextWord}
          onBackToMain={backToMain}
        />
      )}
    </>
  );
};

export default GamePage;
