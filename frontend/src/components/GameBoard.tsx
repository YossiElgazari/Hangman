type GameBoardProps = {
  word: { word: string; difficulty: string; hint: string; category: string };
  guessedLetters: string[];
};

const GameBoard = ({ word, guessedLetters }: GameBoardProps) => {
  const lines = word.word.split(" "); // Split the word into lines based on spaces

  return (
    <div className="flex flex-grow justify-center items-center flex-col mb-4" data-testid="gameboard">
      {lines.map((line, lineIndex) => (
        <div
          key={lineIndex}
          className="flex flex-row flex-wrap justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 mb-2"
        >
          {line.split("").map((char, charIndex) => {
            const isGuessed = guessedLetters.includes(char.toLowerCase()); // Check if the character is guessed
            return (
              <div
                key={`${lineIndex}-${charIndex}`}
                className={`flex items-center justify-center border border-gray-400 dark:border-gray-600 shadow-md text-gray-800 dark:text-gray-100 font-permanent font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20  
                  ${
                    char === "-"
                      ? "bg-transparent border-none shadow-none"
                      : "bg-gray-200 dark:bg-gray-700"
                  } 
                  ${isGuessed ? "reveal" : ""}`}
              >
                <span className={`${char === "-" ? "font-permanent" : ""}`}>
                  {char === "-" ? "-" : isGuessed ? char.toUpperCase() : ""}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
