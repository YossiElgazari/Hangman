import React from 'react';

type GameBoardProps = {
  words: { word: string, hint: string, category: string }[];
};

const GameBoard = ({ words }: GameBoardProps) => {
  if (!words.length) {
    return <div className="p-4 text-center">Select a category and difficulty to start the game.</div>;
  }

  const { word, hint } = words[0];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Word: {word}</h2>
      <p className="text-lg">Hint: {hint}</p>
    </div>
  );
};

export default GameBoard;
