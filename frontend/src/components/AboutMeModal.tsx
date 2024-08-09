import { useEffect, useState } from "react";
import XButton from "./XButton";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import logo from "../assets/logo.png";

const AboutMeModal = ({ closeModal }: { closeModal: () => void }) => {
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
      data-testid="about-me-modal"
    >
      <div
        className="bg-primary dark:bg-primary_dark p-4 sm:p-8 rounded-lg shadow-lg w-11/12 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl relative font-outfit transition-transform duration-300 transform"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
        style={{ transform: isVisible ? "translateY(0)" : "translateY(-20px)" }}
      >
        <div
          className="absolute inset-0 bg-center opacity-20 rounded-lg "
          style={{ backgroundImage: `url(${logo})`, backgroundSize: "150%" }}
        ></div>
        <XButton dataTestId="close-about-me-modal" handleClose={handleClose} />
        <div className="relative flex flex-col items-center">
          <h2 className="text-2xl dark:text-secondary_dark font-bold mb-4">
            About Me
          </h2>
          <span className="text-gray-700 dark:text-secondary_dark mb-4 text-body2 lg:text-body1 ">
            <b>Hi,</b> my name is Yossi Elgazari <br />I am a junior software
            developer with a strong passion for learning and innovation. A
            lifelong gamer, I have been immersed in the gaming world since
            childhood, which has fueled my enthusiasm for technology and
            software development.
            <br />
            If you would like to see more:
          </span>
          <div className="flex justify-between w-[40%] p-2 dark:bg-primary bg-primary_dark bg-opacity-5 dark:bg-opacity-5 rounded-full">
            <a
              href="https://github.com/YossiElgazari"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700"
            >
              <FaGithub size={30} />
            </a>
            <a
              href="https://www.linkedin.com/in/yossielgazari/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              <FaLinkedin size={30} />
            </a>
            <a
              href="https://yossi.portfolio.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={logo}
                alt="portfolio"
                className="w-8 h-8 hover:opacity-70  rounded-full p-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMeModal;
