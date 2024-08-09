import CategorySelector from "./CategorySelector";
import { useEffect, useState } from "react";
import XButton from "./XButton";

type CategoryModalProps = {
  closeModal: (selectedWord?: {
    word: string;
    difficulty: string;
    hint: string;
    category: string;
  }) => void;
};

const CategoryModal = ({ closeModal }: CategoryModalProps) => {
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
      data-testid="category-modal"
      className={`fixed z-20 inset-0 bg-secondary50 bg-opacity-75 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className="bg-primary dark:bg-primary_dark p-4 sm:p-8 rounded-lg shadow-lg w-11/12 max-w-sm md:max-w-xl lg:max-w-2xl xl:max-w-2xl relative font-outfit transition-transform duration-300 transform"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
        style={{ transform: isVisible ? "translateY(0)" : "translateY(-20px)" }}
      >
        <XButton dataTestId="close-category-modal" handleClose={handleClose} />
        <div className="relative flex flex-col items-center">
          <CategorySelector setWord={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
