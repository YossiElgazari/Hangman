import { useState, useEffect } from "react";
import MyButton from "./MyButton";
import XButton from "./XButton";

type AboutModalProps = {
  closeModal: () => void;
};

const AboutModal = ({ closeModal }: AboutModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  // Show the modal when the component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Delay closing the modal to allow for transition
    setTimeout(() => closeModal(), 300);
  };

  return (
    <div
      className={`fixed z-20 inset-0 bg-secondary50 bg-opacity-75 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
      data-testid="about-modal"
    >
      <div
        className="bg-primary dark:bg-primary_dark p-4 sm:p-8 rounded-lg shadow-lg w-11/12 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl relative font-outfit transition-transform duration-300 transform"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
        style={{ transform: isVisible ? "translateY(0)" : "translateY(-20px)" }}
      >
        <XButton handleClose={handleClose} />

        <div className="relative flex flex-col items-center">
          <h2 className="text-2xl dark:text-secondary_dark font-bold mb-4">
            About The Game
          </h2>
          <p className="text-gray-700 dark:text-secondary_dark mb-4 text-body2 lg:text-body1">
            Hangman is a classic word-guessing game. The goal is to guess the
            word one letter at a time. Each correct guess earns you 10 points,
            while each incorrect guess brings you closer to being "hanged." You
            win by guessing the word correctly before running out of 6 attempts.
            As long as you keep guessing the words correctly, the next word
            will be random. The game continues until you either lose or choose
            to submit your score.
          </p>
          <div className="flex justify-center mt-4">
            <MyButton
              dataTestId="close-about-modal"
              onClick={handleClose}
              size="small"
            >
              Close
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
