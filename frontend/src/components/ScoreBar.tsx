import { useState, useEffect } from 'react';

const ScoreBar = ({ score }: { score: number }) => {
  const [displayScore, setDisplayScore] = useState(score);

  useEffect(() => {
    const incrementScore = () => {
      if (displayScore < score) {
        setDisplayScore((prev) => Math.max(prev + 1, 0));
      }
    };

    if (displayScore < score) {
      const interval = setInterval(incrementScore, 50);
      return () => clearInterval(interval);
    } else if (displayScore > score) {
      setDisplayScore(Math.max(score, 0)); // Immediate update if score decreases
    }
  }, [score, displayScore]);

  return (
    <p className="font-permanent text-headline4 font-semibold text-gray-700 dark:text-secondary_dark50">
      Score: {displayScore}
    </p>
  );
};

export default ScoreBar;
