
const Keyboard = ({ onGuess, guessedLetters }: { onGuess: (letter: string) => void; guessedLetters: string[] }) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="keyboard flex flex-wrap justify-center my-4">
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => onGuess(letter)}
          disabled={guessedLetters.includes(letter)}
          className="m-1 px-3 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
