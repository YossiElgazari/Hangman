
const GameStatus = ({ status, remainingAttempts, onReset }: { status: string; remainingAttempts: number; onReset: () => void }) => {
  return (
    <div className="game-status my-4 text-center">
      <p>Status: {status}</p>
      <p>Remaining Attempts: {remainingAttempts}</p>
      <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded" onClick={onReset}>Reset Game</button>
    </div>
  );
};

export default GameStatus;
