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
import { title } from "process";

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
  const [isFetching, setIsFetching] = useState(false);
  const [prevWord, setPrevWord] = useState<string | null>(null);

  // Animation for page load
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
        onComplete: () => {titleAnimationWhenNewGame()},
      });
    };

    const titleAnimationWhenNewGame = () => {
      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "power1.out" },
      });
    
      tl.fromTo(
        ".title",
        { scale: 1, rotation: 0, opacity: 1 },
        {
          scale: 1.2, // Increase size
          opacity: 1,
          duration: 0.5,
          stagger: 0.1, // Stagger effect for each letter
        }
      )
      .to(".title", {
        scale: 1, // Return to original size
        rotation: 0, // Return to original rotation
        duration: 0.5, // Duration to return to normal
        ease: "elastic.out(1, 0.5)", // Elastic effect for a bouncy return
      });
    };
    animationStartGamePage();

  }, [word]);

  useEffect(() => {
    // Update volume based on settings
    correctGuessSound.volume(settings.soundEffectsVolume / 100);
    wrongGuessSound.volume(settings.soundEffectsVolume / 100);
    winSound.volume(settings.soundEffectsVolume / 100);
    loseSound.volume(settings.soundEffectsVolume / 100);

    // Check game status
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
    setIsFetching(true);

    let nextWord;
    do {
      nextWord = await fetchWordByCategory({
        category: "random",
        difficulty: "random",
      });
    } while (nextWord.word === prevWord);

    setIsFetching(false);
    setPrevWord(nextWord.word); // Update prevWord with the new word
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus(null);
    startGame(nextWord);
  };

  if (!word) return null;

  return (
    <>
      <div data-testid="game-page" className="game-page h-full flex flex-col items-center justify-center p-4 md:p-8">
        <div className="flex flex-col justify-center items-center md:mt-10 xl:mt-2 lg:mb-4">
          <div className="flex flex-row justify-center items-center">
            <p className="title font-permanent tracking-[0.2em] text-headline3 lg:text-headline2 2k:text-headline1 font-semibold text-center text-gray-700 dark:text-secondary_dark50  mr-2">
              {word.category.toUpperCase()}
            </p>
            <HintButton openModal={() => setIsHintModalOpen(true)} />
          </div>
          <ScoreBar score={score} />
        </div>
        <div className="flex w-full justify-center items-center flex-grow md:flex-row flex-col-reverse">
          <div className="md:w-1/3 md:flex md:justify-center md:items-center my-1 md:my-0">
          </div>
          <div className="md:w-2/3 md:flex md:justify-center md:items-center my-1 md:my-0">
            <GameBoard word={word} guessedLetters={guessedLetters} />
          </div>
          <div className="md:w-1/3 md:flex md:justify-center md:items-center my-1 md:my-0">
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
          isFetching={isFetching}
        />
      )}
    </>
  );
};

export default GamePage;
