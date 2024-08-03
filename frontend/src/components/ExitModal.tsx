import { useEffect, useState } from 'react';
import MyButton from './MyButton';
import XButton from './XButton';

type ExitModalProps = {
  closeModal: () => void;
};

const ExitModal = ({ closeModal }: ExitModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => closeModal(), 300); // Delay to allow fade-out animation
  };

  const handleExit = () => {
    window.open('', '_self', ''); // Some browsers require this for window.close() to work
    window.close();
  };

  return (
    <div
      className={`fixed z-30 inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div
        className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-11/12 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative transition-transform duration-300 transform"
        onClick={(e) => e.stopPropagation()}
        style={{ transform: isVisible ? 'translateY(0)' : 'translateY(-20px)' }}
      >
        <XButton handleClose={handleClose} />
        <div>
          <h2 className="text-xl font-bold mb-4">Exit Game</h2>
          <p className="text-gray-700">
            Are you sure you want to exit the game?
          </p>
          <div className="flex justify-center items-center gap-4 mt-6">
            <MyButton onClick={handleExit} size="small">
              Yes
            </MyButton>
            <MyButton onClick={handleClose} size="small">
              No
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitModal;
