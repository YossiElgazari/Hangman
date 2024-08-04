import CategorySelector from './CategorySelector';
import { useEffect, useState } from 'react';
import XButton from './XButton.tsx';

type CategoryModalProps = {
  closeModal: (selectedWord?: { word: string, difficulty: string, hint: string, category: string }) => void;
};

const CategoryModal = ({ closeModal }: CategoryModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => closeModal(), 300);
  };

  return (
    <div
      className={`p-4 fixed z-20 inset-0 bg-secondary50 dark:bg-slate-700 dark:bg-opacity-75 bg-opacity-75 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      <div
        className="bg-primary dark:bg-primary_dark p-8 rounded-lg shadow-lg max-w-md w-full md:max-w-xl lg:max-w-2xl relative transition-transform duration-300 transform"
        onClick={(e) => e.stopPropagation()}
        style={{ transform: isVisible ? 'translateY(0)' : 'translateY(-20px)' }}
      >
        <XButton handleClose={handleClose} />
        <CategorySelector setWord={closeModal}  />
      </div>
    </div>
  );
};

export default CategoryModal;
