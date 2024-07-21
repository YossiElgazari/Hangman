import React, { useEffect, useState } from 'react';
import { fetchTopScores } from '../service/api';

const Scoreboard = () => {
  const [scores, setScores] = useState<{ username: string, score: number }[]>([]);

  useEffect(() => {
    const getScores = async () => {
      const scoresData = await fetchTopScores();
      setScores(scoresData);
    };
    getScores();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Top Scores</h2>
      <ul className="list-disc list-inside">
        {scores.map((score, index) => (
          <li key={index} className="text-lg">
            {score.username}: {score.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
