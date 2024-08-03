type GameBoardProps = {
  word: { word: string; difficulty: string; hint: string; category: string };
  guessedLetters: string[];
};

const GameBoard = ({ word, guessedLetters }: GameBoardProps) => {
  const lines = word.word.split(" ");

  return (
    <div className="flex justify-center items-center flex-col mb-4 ">
      {lines.map((line, lineIndex) => (
        <div
          key={lineIndex}
          className="flex flex-row flex-wrap justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 mb-2"
        >
          {line.split("").map((char, charIndex) => {
            const isGuessed = guessedLetters.includes(char.toLowerCase());
            return (
              <div
                key={`${lineIndex}-${charIndex}`}
                className={`flex items-center justify-center border border-gray-400 dark:border-gray-600 shadow-md text-gray-800 dark:text-gray-100 font-permanent font-semibold text-headline3 md:text-headline2 lg:text-7xl w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-32 lg:h-32  
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
