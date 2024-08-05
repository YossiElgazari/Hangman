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
      className={`fixed z-20 inset-0 bg-secondary50 bg-opacity-75 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      onClick={handleClose}
    >
      <div
        className="bg-primary dark:bg-primary_dark p-6 rounded-lg shadow-lg max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl relative transition-transform duration-300 transform"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
        style={{ transform: isVisible ? "translateY(0)" : "translateY(-20px)" }}
      >
        <XButton handleClose={handleClose} />

        <div>
          <h2 className="text-xl dark:text-secondary_dark font-bold mb-4">About The Game</h2>
          <p className="text-gray-700 dark:text-secondary_dark50">
            Hangman is a classic word guessing game. The goal is to guess the
            word one letter at a time. Each incorrect guess brings you closer to
            being "hanged". You win by guessing the word correctly before
            running out of attempts.
          </p>
          <div className="flex justify-center mt-4">
            <MyButton onClick={handleClose} size="small">
              Close
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
