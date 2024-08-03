import { useEffect, useState } from 'react';
import XButton from './XButton';
import MyButton from './MyButton';

type HintModalProps = {
  hint: string;
  onClose: () => void;
};

const HintModal = ({ hint, onClose }: HintModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300); // Delay to allow fade-out animation
  };

  return (
    <div
      className={`fixed z-30 inset-0 bg-secondary50 dark:bg-slate-700 dark:bg-opacity-75 bg-opacity-75 flex items-center justify-center transition-opacity duration-300  ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div
        className="bg-primary dark:bg-primary_dark p-6 rounded-lg shadow-lg max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl relative transition-transform duration-300 transform"
        onClick={(e) => e.stopPropagation()}
        style={{ transform: isVisible ? 'translateY(0)' : 'translateY(-20px)' }}
      >
        <XButton handleClose={handleClose} />
        <h2 className="text-xl lg:text-headline4 dark:text-secondary_dark font-bold text-center">Hint</h2>
        <p className="text-gray-700 dark:text-secondary_dark text-lg lg:text-body1 mt-2">{hint}</p>
        <div className="mt-4 flex justify-center">
          <MyButton onClick={handleClose} size="small">
            Close 
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default HintModal;
