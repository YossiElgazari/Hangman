
import { useEffect, useState } from 'react';
import  XButton  from './XButton';



const AboutMeModal = ({ closeModal }: { closeModal: () => void }) => {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        setIsVisible(true);
    }, []);
    
    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => closeModal(), 300); // Delay to allow fade-out animation
    };
    
    return (
        <div
        className={`fixed z-20 inset-0 bg-secondary50 dark:bg-slate-700 dark:bg-opacity-75 bg-opacity-75 flex items-center justify-center transition-opacity duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
        >
        <div
            className="bg-primary dark:bg-primary_dark p-6 sm:p-8 rounded-lg shadow-lg w-11/12 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl  relative transition-transform duration-300 transform"
            onClick={(e) => e.stopPropagation()}
            style={{ transform: isVisible ? 'translateY(0)' : 'translateY(-20px)' }}
        >
            <XButton handleClose={handleClose} />
            <div>
            <h2 className="text-xl  dark:text-secondary_dark font-bold mb-4">About Me</h2>
            <p className="text-gray-700  dark:text-secondary_dark">
                I am a full-stack web developer with a passion for creating
                interactive and engaging web applications. I have experience with
                JavaScript, TypeScript, React, Node.js, Express, and MongoDB. I am
                always eager to learn new technologies and improve my skills.
            </p>
            </div>
        </div>
        </div>
    );
    }

export default AboutMeModal;