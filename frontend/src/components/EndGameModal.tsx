import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGameState } from '../hooks/useGameState';
import { addScore } from '../service/api';

type EndGameModalProps = {
  gameStatus: 'won' | 'lost';
  onNextWord: () => void;
  onBackToMain: () => void;
  word: string;
};

const EndGameModal = ({ gameStatus, onNextWord, onBackToMain, word }: EndGameModalProps) => {
  const { score } = useGameState();
  const [isSubmittingScore, setIsSubmittingScore] = useState(false);
  const [username, setUsername] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { scale: 0 },
      { scale: 1, duration: 0.5, ease: 'bounce.out' }
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
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white p-6 rounded-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {gameStatus === 'won' ? 'Congratulations, You Won!' : 'Game Over, You Lost!'}
        </h2>
        {gameStatus === 'lost' && (
          <p className="text-lg mb-4">The word was: <span className="font-bold">{word}</span></p>
        )}
        <p className="text-xl font-bold mb-4">Score: {score}</p>
        <div className="flex flex-col items-center">
          {gameStatus === 'won' && (
            <button
              onClick={onNextWord}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-4"
            >
              Next Word
            </button>
          )}
          <button
            onClick={onBackToMain}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-4"
          >
            Go Home
          </button>
          {isSubmittingScore ? (
            <div className="flex flex-col items-center">
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Username"
                className="border-2 border-gray-300 p-2 rounded mb-4 w-full"
              />
              <button
                onClick={handleScoreSubmit}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Submit Score
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsSubmittingScore(true)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Submit Score
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EndGameModal;
