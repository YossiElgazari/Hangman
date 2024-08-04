import { useState, useEffect } from 'react';

const ScoreBar = ({ score }: { score: number }) => {
  const [displayScore, setDisplayScore] = useState(score);

  useEffect(() => {
    if (score > displayScore) {
      const interval = setInterval(() => {
        setDisplayScore((prev) => {
          if (prev < score) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 50); // adjust the duration for a smoother or faster transition
      return () => clearInterval(interval);
    }
  }, [score, displayScore]);

  return (
    <p className="font-permanent text-headline4 font-semibold text-gray-700 dark:text-secondary_dark50">
      Score: {displayScore}
    </p>
  );
};

export default ScoreBar;
