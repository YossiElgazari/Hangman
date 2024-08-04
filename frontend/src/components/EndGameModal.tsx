import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGameState } from "../hooks/useGameState";
import { addScore } from "../service/api";
import MyButton from "./MyButton";

type EndGameModalProps = {
  gameStatus: "won" | "lost";
  onNextWord: () => void;
  onBackToMain: () => void;
  word: string;
};

const EndGameModal = ({
  gameStatus,
  onNextWord,
  onBackToMain,
  word,
}: EndGameModalProps) => {
  const { score } = useGameState();
  const [isSubmittingScore, setIsSubmittingScore] = useState(false);
  const [username, setUsername] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { scale: 0 },
      { scale: 1, duration: 0.5, ease: "bounce.out" }
    );
  }, []);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleScoreSubmit = async () => {
    if (username.trim()) {
      // Submit score
      const res = await addScore({ username, score });
      console.log(res);
      onBackToMain();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20 bg-secondary50 bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-primary dark:bg-primary_dark border border-primary_dark dark:border-primary p-6 rounded-xl w-96 text-center shadow-lg"
      >
        <h2 className="text-headline2 font-outfit mb-4 bg-primary50 text-primary_dark dark:text-primary dark:bg-primary_dark50 p-2 rounded-xl">
          {gameStatus === "won" ? "You Won!" : "Game Over!"}
        </h2>
        {gameStatus === "lost" && (
          <p className="text-body1 text-primary_dark dark:text-primary mb-4">
            The word was: <span className="font-bold">{word}</span>
          </p>
        )}
        <p className="text-body1 text-primary_dark dark:text-primary font-bold mb-4">Score: {score}</p>
        <div className="flex flex-col items-center">
          {gameStatus === "won" && (
            <MyButton onClick={onNextWord}>Next Word</MyButton>
          )}
          <MyButton className="mb-4" onClick={onBackToMain}>Go Home</MyButton>
          {isSubmittingScore ? (
            <div className="flex flex-col items-center w-full">
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Username"
                className="bg-primary dark:bg-primary_dark border-2 border-primary_dark50 p-2 rounded-xl mb-4 font-poppins w-full focus:outline-none  focus:bg-primary50 dark:focus:bg-primary_dark50 focus:text-primary_dark dark:focus:text-primary"
              />
              <MyButton onClick={handleScoreSubmit}>
                Submit Score
              </MyButton>
            </div>
          ) : (
            <MyButton onClick={() => setIsSubmittingScore(true)}>
              Submit Score
            </MyButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default EndGameModal;
