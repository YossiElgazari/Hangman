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
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  // Animate the modal when it appears
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
    // Check if username is provided
    if (!username.trim()) {
      setError("Username cannot be empty");
      setTimeout(() => setError(""), 2000); // Clear error after 2 seconds
      return;
    }

    try {
      const response = await addScore({ username, score });
      if (response && !response.message) {
        onBackToMain(); // Go back to main if score submission is successful
      } else {
        setError(response.message || "Something went wrong. Please try again.");
        setTimeout(() => setError(""), 2000);
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div className="fixed z-20 inset-0 bg-secondary50 bg-opacity-75 flex items-center justify-center transition-opacity duration-300">
      <div
       data-testid="endgame-modal"
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
            <MyButton onClick={onNextWord} className="mb-4">Next Word</MyButton>
          )}
          <MyButton className="mb-4" onClick={onBackToMain}>Go Home</MyButton>
          {error && (
            <div className="flex items-center text-red-600 bg-red-100 border border-red-600 rounded-md p-2 mb-6 transition-opacity duration-1000 ease-in-out animate-fade-in-out">
              <span>{error}</span>
            </div>
          )}
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
                Send
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
