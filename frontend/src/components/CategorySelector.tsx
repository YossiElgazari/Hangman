import React, { useState } from 'react';
import { fetchWordByCategory } from '../service/api';

type CategorySelectorProps = {
  setWords: (words: { word: string, hint: string, category: string }[]) => void;
};

const CategorySelector = ({ setWords }: CategorySelectorProps) => {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    const words = await fetchWordByCategory({ category: selectedCategory, difficulty });
    setWords(words);
  };

  const handleDifficultyChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDifficulty = event.target.value;
    setDifficulty(selectedDifficulty);
    if (category) {
      const words = await fetchWordByCategory({ category, difficulty: selectedDifficulty });
      setWords(words);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Select Category:</label>
        <select value={category} onChange={handleCategoryChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <option value="">--Select--</option>
          <option value="Animals">Animals</option>
          <option value="Countries">Countries</option>
          <option value="Fruits">Fruits</option>
          <option value="Food">Food</option>
          <option value="Random">Random</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Select Difficulty:</label>
        <select value={difficulty} onChange={handleDifficultyChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <option value="">--Select--</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="Random">Random</option>
        </select>
      </div>
    </div>
  );
};

export default CategorySelector;
