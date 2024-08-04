import { useState } from "react";
import { fetchWordByCategory } from "../service/api";
import MyButton from "./MyButton.tsx";
import ButtonSelect from "./ButtonSelect.tsx";

type CategorySelectorProps = {
  setWord: (word: {
    word: string;
    difficulty: string;
    hint: string;
    category: string;
  }) => void;
};

const CategorySelector = ({ setWord }: CategorySelectorProps) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState("");

  const handleStartGame = async () => {
    if (!category || !difficulty) {
      setError("Please select both a category and difficulty.");
      setTimeout(() => setError(""), 3000); 
      return;
    }
    const word = await fetchWordByCategory({ category, difficulty });
    setWord(word);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <ButtonSelect
        label="Select Category"
        value={category}
        onChange={setCategory}
        options={[
          { value: "random", label: "Random" },
          { value: "Animals", label: "Animals" },
          { value: "Countries", label: "Countries" },
          { value: "Fruits", label: "Fruits" },
          { value: "Food", label: "Food" },
        ]}
      />

      <ButtonSelect
        label="Select Difficulty"
        value={difficulty}
        onChange={setDifficulty}
        options={[
          { value: "random", label: "Random" },
          { value: "easy", label: "Easy" },
          { value: "medium", label: "Medium" },
          { value: "hard", label: "Hard" },
        ]}
      />
      {error && (
        <div className="flex items-center text-red-600 bg-red-100 border border-red-600 rounded-md p-2 mb-6 transition-opacity duration-1000 ease-in-out animate-fade-in-out">
          <span>{error}</span>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <MyButton onClick={handleStartGame}>Start Game</MyButton>
      </div>
    </div>
  );
};

export default CategorySelector;
