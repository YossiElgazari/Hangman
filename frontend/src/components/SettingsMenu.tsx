import { useState, useEffect, useRef } from "react";
import SettingsModal from "./SettingsModal";
import ExitModal from "./ExitModal";
import { useGameState } from "../hooks/useGameState";

const settingsIcon = (
  <svg
    id="settings"
    width="800px"
    height="800px"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <clipPath id="clip-settings">
        <rect width="32" height="32" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-settings)">
      <g
        id="Group_1878"
        data-name="Group 1878"
        transform="translate(-416 -416)"
      >
        <g id="Group_1869" data-name="Group 1869">
          <g id="Group_1854" data-name="Group 1854">
            <g id="Group_1853" data-name="Group 1853">
              <g id="Group_1852" data-name="Group 1852">
                <g id="Group_1851" data-name="Group 1851">
                  <g id="Group_1850" data-name="Group 1850">
                    <g id="Group_1849" data-name="Group 1849">
                      <g id="Group_1848" data-name="Group 1848">
                        <g id="Group_1847" data-name="Group 1847">
                          <g id="Group_1846" data-name="Group 1846">
                            <g id="Group_1845" data-name="Group 1845">
                              <g id="Group_1844" data-name="Group 1844">
                                <g id="Group_1843" data-name="Group 1843">
                                  <g id="Group_1842" data-name="Group 1842">
                                    <g id="Group_1841" data-name="Group 1841">
                                      <path
                                        id="Path_3753"
                                        data-name="Path 3753"
                                        d="M447.812,430.72a15.955,15.955,0,0,0-.467-2.74,2,2,0,0,0-1.7-1.481l-2.565-.3,1.205-2.275a2,2,0,0,0-.248-2.237,15.872,15.872,0,0,0-1.99-1.952,2,2,0,0,0-2.246-.2l-2.251,1.261-.365-2.569a2,2,0,0,0-1.514-1.664,15.77,15.77,0,0,0-2.757-.392l-.115,0a2,2,0,0,0-1.816,1.162l-1.08,2.343-1.8-1.857a2,2,0,0,0-2.208-.455,15.738,15.738,0,0,0-2.468,1.285,2,2,0,0,0-.879,2.071l.506,2.544-2.542-.444a1.933,1.933,0,0,0-.345-.031,2,2,0,0,0-1.706.956,15.846,15.846,0,0,0-1.235,2.5,2,2,0,0,0,.5,2.2l1.893,1.752L417.3,431.32a2,2,0,0,0-1.114,1.96,15.955,15.955,0,0,0,.467,2.74,2,2,0,0,0,1.7,1.481l2.566.3-1.207,2.277a2,2,0,0,0,.249,2.239,16.056,16.056,0,0,0,1.99,1.948,2,2,0,0,0,2.246.2l2.25-1.261.365,2.57a2,2,0,0,0,1.519,1.666,16.031,16.031,0,0,0,2.753.389l.115,0a2,2,0,0,0,1.816-1.162l1.08-2.343,1.8,1.858a2,2,0,0,0,2.205.456,15.822,15.822,0,0,0,2.468-1.283,2,2,0,0,0,.882-2.073l-.506-2.545,2.542.446a2.026,2.026,0,0,0,.345.03,2,2,0,0,0,1.707-.958,15.859,15.859,0,0,0,1.235-2.5,2,2,0,0,0-.505-2.2l-1.894-1.752,2.324-1.135A2,2,0,0,0,447.812,430.72Zm-5.641,1.947a10.236,10.236,0,0,1-.227,1.625l2.966,2.743a13.9,13.9,0,0,1-1.079,2.184l-3.991-.7a10.007,10.007,0,0,1-1.146,1.165l.794,3.993a13.925,13.925,0,0,1-2.156,1.119l-2.822-2.916a10.191,10.191,0,0,1-1.614.276l-1.7,3.678a13.859,13.859,0,0,1-2.407-.338l-.571-4.028a10.021,10.021,0,0,1-1.469-.725l-3.532,1.979a13.943,13.943,0,0,1-1.741-1.7l1.893-3.57a10.047,10.047,0,0,1-.756-1.457l-4.028-.477a13.984,13.984,0,0,1-.409-2.4l3.648-1.784a10.386,10.386,0,0,1,.226-1.625l-2.965-2.743a13.876,13.876,0,0,1,1.079-2.182l3.991.7a10.323,10.323,0,0,1,1.145-1.165l-.793-3.992a13.935,13.935,0,0,1,2.156-1.121l2.822,2.916a10.2,10.2,0,0,1,1.613-.276l1.7-3.678a13.67,13.67,0,0,1,2.407.34l.571,4.026a10.276,10.276,0,0,1,1.469.725l3.532-1.979a13.882,13.882,0,0,1,1.74,1.706l-1.892,3.57a10.123,10.123,0,0,1,.756,1.455l4.028.477a13.984,13.984,0,0,1,.409,2.4Z"
                                        fill="#000000"
                                      />
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="Group_1868" data-name="Group 1868">
            <g id="Group_1867" data-name="Group 1867">
              <g id="Group_1866" data-name="Group 1866">
                <g id="Group_1865" data-name="Group 1865">
                  <g id="Group_1864" data-name="Group 1864">
                    <g id="Group_1863" data-name="Group 1863">
                      <g id="Group_1862" data-name="Group 1862">
                        <g id="Group_1861" data-name="Group 1861">
                          <g id="Group_1860" data-name="Group 1860">
                            <g id="Group_1859" data-name="Group 1859">
                              <g id="Group_1858" data-name="Group 1858">
                                <g id="Group_1857" data-name="Group 1857">
                                  <g id="Group_1856" data-name="Group 1856">
                                    <g id="Group_1855" data-name="Group 1855">
                                      <path
                                        id="Path_3754"
                                        data-name="Path 3754"
                                        d="M432,425.949A6.051,6.051,0,1,0,438.051,432,6.051,6.051,0,0,0,432,425.949Zm0,11.1A5.051,5.051,0,1,1,437.051,432,5.057,5.057,0,0,1,432,437.051Z"
                                        fill="#000000"
                                      />
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
        <g id="Group_1873" data-name="Group 1873">
          <g id="Group_1872" data-name="Group 1872">
            <g id="Group_1871" data-name="Group 1871">
              <g id="Group_1870" data-name="Group 1870">
                <path
                  id="Path_3755"
                  data-name="Path 3755"
                  d="M436.6,439.342a8.642,8.642,0,0,1-6.539,1.1.5.5,0,0,1,.224-.975,7.675,7.675,0,0,0,9.189-5.753.5.5,0,0,1,.975.224A8.641,8.641,0,0,1,436.6,439.342Z"
                  fill="#000000"
                />
              </g>
            </g>
          </g>
        </g>
        <g id="Group_1877" data-name="Group 1877">
          <g id="Group_1876" data-name="Group 1876">
            <g id="Group_1875" data-name="Group 1875">
              <g id="Group_1874" data-name="Group 1874">
                <path
                  id="Path_3756"
                  data-name="Path 3756"
                  d="M434.1,424.465a.5.5,0,0,1-.377.064,7.675,7.675,0,0,0-9.189,5.753.5.5,0,0,1-.975-.224,8.676,8.676,0,0,1,10.388-6.5.5.5,0,0,1,.153.911Z"
                  fill="#000000"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

const SettingsMenu = () => {
  const { isGameStarted } = useGameState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const { backToMain } = useGameState();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setTimeout(() => setIsMenuVisible(false), 300); // Delay to allow fade-out animation
    } else {
      setIsMenuVisible(true);
      setTimeout(() => setIsMenuOpen(true), 0); // Delay to ensure visibility before animation
    }
  };

  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
    setIsMenuOpen(false);
    setTimeout(() => setIsMenuVisible(false), 300); // Delay to allow fade-out animation
  };

  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
      setTimeout(() => setIsMenuVisible(false), 300); // Delay to allow fade-out animation
    }
  };

  const handleBackToMain = () => {
    setIsMenuOpen(false);
    setIsMenuVisible(false);
    backToMain();
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="flex items-center" ref={menuRef}>
      <div
        className={`w-10 h-10 mr-2 flex items-center justify-center cursor-pointer transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "transform rotate-90" : ""
        }`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <span className="text-secondary dark:text-secondary_dark50 text-body1 lg:text-headline4 hover:opacity-75 xl:text-headline4 ">
            ✕
          </span>
        ) : (
          <span className="hover:opacity-75">{settingsIcon}</span>
        )}
      </div>
      {isMenuVisible && (
        <div
          className={`absolute top-12 left-2 bg-slate-300 dark:bg-primary_dark dark:text-secondary_dark shadow-lg rounded-lg w-40 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100 animate-drop" : "opacity-0"
          }`}
        >
          
          <ul className="flex flex-col p-2">
            {isGameStarted && (
              <li
                className="hover:bg-gray-400 dark:hover:bg-primary_dark50 p-2 rounded cursor-pointer"
                onClick={handleBackToMain}
              >
                Home
              </li>
            )}
            <li
              className="hover:bg-gray-400 dark:hover:bg-primary_dark50 p-2 rounded cursor-pointer"
              onClick={openSettingsModal}
            >
              Settings
            </li>
            <li
              className="hover:bg-gray-400 dark:hover:bg-primary_dark50 p-2 rounded cursor-pointer"
              onClick={() => {
                setIsExitModalOpen(true);
                setIsMenuVisible(false);
                setIsMenuOpen(false);
              }}
            >
              Exit
            </li>
          </ul>
        </div>
      )}
      {isSettingsModalOpen && <SettingsModal onClose={closeSettingsModal} />}
      {isExitModalOpen && (
        <ExitModal closeModal={() => setIsExitModalOpen(false)} />
      )}
    </div>
  );
};

export default SettingsMenu;
