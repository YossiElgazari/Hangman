import { useEffect, useState } from 'react';
import MyButton from './MyButton';
import XButton from './XButton';

type ExitModalProps = {
  closeModal: () => void;
};

const ExitModal = ({ closeModal }: ExitModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  // Show the modal when the component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => closeModal(), 300); // Delay to allow fade-out animation
  };

  const handleExit = () => {
    // exit browser
  };

  return (
    <div
      className={`fixed z-20 inset-0 bg-secondary50 bg-opacity-75 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      onClick={handleClose}
      data-testid="exit-modal"
    >
      <div
        className="bg-primary dark:bg-primary_dark dark:text-primary text-secondary p-6 sm:p-8 rounded-lg shadow-lg w-11/12 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative transition-transform duration-300 transform"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
        style={{ transform: isVisible ? 'translateY(0)' : 'translateY(-20px)' }}
      >
        <XButton handleClose={handleClose} />
        <div className='flex flex-col items-center justify-center '>
          <h2 className="text-xl font-bold mb-4">Exit Game</h2>
          <p>
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
