import { useState, useEffect } from 'react';

const ScoreBar = ({ score }: { score: number }) => {
  const [displayScore, setDisplayScore] = useState(score);

  useEffect(() => {
    const incrementScore = () => {
      if (displayScore < score) {
        setDisplayScore((prev) => Math.max(prev + 1, 0)); // Increment displayScore by 1
      }
    };

    if (displayScore < score) {
      // Gradually increment displayScore to match the actual score
      const interval = setInterval(incrementScore, 50);
      return () => clearInterval(interval); // Clear interval on cleanup
    } else if (displayScore > score) {
      // Immediate update if the score decreases
      setDisplayScore(Math.max(score, 0));
    }
  }, [score, displayScore]);

  return (
    <p className="font-permanent text-headline4 font-semibold text-gray-700 dark:text-secondary_dark50">
      Score: {displayScore}
    </p>
  );
};

export default ScoreBar;
