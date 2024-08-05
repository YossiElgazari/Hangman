import { useState } from "react";
import hintIcon from "../assets/hinticon.svg";
import hintIconHover from "../assets/hinticonhover.svg";
import hintNoMoney from "../assets/hintnomoney.svg";
import { useGameState } from "../hooks/useGameState";

type HintButtonProps = {
  openModal: () => void;
};

const HintButton = ({ openModal }: HintButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [clickedOnce, setClickedOnce] = useState(false);
  const [noMoney, setNoMoney] = useState(false);
  const { buyHint } = useGameState();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    if (clickedOnce) {
      const res = buyHint();
      if (res) {
        openModal();
      } else {
        // Activate red hint icon for 2 seconds
        setNoMoney(true);
        setTimeout(() => setNoMoney(false), 2000);
      }
    } else {
      setClickedOnce(true);
      setTimeout(() => setClickedOnce(false), 3000); // Reset after 3 seconds if no second click
    }
  };

  return (
    <div className="relative">
      <img
        src={noMoney ? hintNoMoney : isHovered ? hintIconHover : hintIcon}
        alt="hint"
        className="w-10 h-10 cursor-pointer"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {clickedOnce && (
        <div className="absolute left-1/2 bottom-12 transform -translate-x-1/2 text-center bg-gray-700 text-white text-sm p-2 rounded">
          Click twice
          <div className="tooltip-arrow"></div>
        </div>
      )}
    </div>
  );
};

export default HintButton;
