import { useState, useEffect } from "react";
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
        setClickedOnce(false); // Reset after successful hint purchase
      } else {
        setNoMoney(true);
        setTimeout(() => {
          setNoMoney(false);
          setClickedOnce(false); // Reset after showing no money message
        }, 2000);
      }
    } else {
      setClickedOnce(true);
      // Reset after 3 seconds if no second click
      setTimeout(() => {
        setClickedOnce(false);
        if (!noMoney) {
          setIsHovered(false); // Reset hover state if no insufficient funds message
        }
      }, 2000); 
    }
  };

  useEffect(() => {
    if (noMoney) {
      setIsHovered(false);
    }
  }, [noMoney]);

  return (
    <div className="relative">
      <img
        src={noMoney ? hintNoMoney : isHovered ? hintIconHover : hintIcon}
        alt="hint"
        className="w-10 h-10 xl:h-12 xl:w-12 2k:w-14 2k:h-14 cursor-pointer"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {clickedOnce && !noMoney && (
        <div className="absolute z-30 left-1/2 bottom-12 transform -translate-x-1/2 text-center w-24 bg-gray-700 text-white text-sm p-2 rounded">
          Click twice
          <div className="tooltip-arrow"></div>
        </div>
      )}
      {noMoney && (
        <div className="absolute z-30 left-1/2 bottom-12 transform -translate-x-1/2 text-center w-32 bg-gray-700 text-white text-sm p-2 rounded">
          Not enough score
          <div className="tooltip-arrow"></div>
        </div>
      )}
    </div>
  );
};

export default HintButton;
