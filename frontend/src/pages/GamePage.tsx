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
import { useSettings } from "../hooks/useSettings";

// Load the sounds
const correctGuessSound = new Howl({
  src: ['/correct.mp3'], 
});

const wrongGuessSound = new Howl({
  src: ['/wrong.mp3'], 
});

const winSound = new Howl({
  src: ['/win.mp3'], 
});

const loseSound = new Howl({
  src: ['/lose.mp3'], 
});

const GamePage = () => {
  const { word, backToMain, startGame, gameStatus, setGameStatus, incrementScore, score } = useGameState();
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);
  const { settings } = useSettings();


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
    // Update volume based on settings
    correctGuessSound.volume(settings.soundEffectsVolume / 100); 
    wrongGuessSound.volume(settings.soundEffectsVolume / 100);
    winSound.volume(settings.soundEffectsVolume / 100);
    loseSound.volume(settings.soundEffectsVolume / 100);
    
    if (wrongGuesses >= 6) {
      setGameStatus("lost");
      loseSound.play(); 
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
      winSound.play();
    }
  }, [guessedLetters, wrongGuesses, word, gameStatus, setGameStatus, settings.soundEffectsVolume]);

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
      wrongGuessSound.play(); // Play the sound effect
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
        <div className="flex flex-col justify-center items-center mb-2 md:mt-10 xl:mt-2 lg:mb-4">
          <div className="flex flex-row justify-center items-center">
            <p className="font-permanent tracking-[0.2em] text-headline2 font-semibold text-center text-gray-700 dark:text-secondary_dark50  mr-2">
              {word.category.toUpperCase()}
            </p>
            <HintButton openModal={() => setIsHintModalOpen(true)} />
          </div>
          <ScoreBar score={score} />
        </div>
        <div className="flex justify-center items-center flex-grow md:flex-row flex-col-reverse">
          <GameBoard word={word} guessedLetters={guessedLetters} />
          <div className="md:w-1/3 md:flex md:justify-center md:items-center">
            <HangmanAnimation wrongGuesses={wrongGuesses} />
          </div>
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
