import { useState, useEffect } from "react";
import MyButton from "./MyButton";
import XButton from "./XButton";
import { useSettings } from "../hooks/useSettings";

type SettingsModalProps = {
  onClose: () => void;
};

const SettingsModal = ({ onClose }: SettingsModalProps) => {
  const { settings, updateSettings } = useSettings();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Delay to allow fade-out animation
  };

  return (
    <div
      className={`fixed inset-0 bg-secondary50 bg-opacity-75 flex items-center justify-center z-30 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className="bg-primary dark:bg-primary_dark p-8 rounded-lg shadow-lg max-w-sm w-full md:max-w-md lg:max-w-lg relative transition-transform duration-300 transform"
        onClick={(e) => e.stopPropagation()}
        style={{ transform: isVisible ? "translateY(0)" : "translateY(-20px)" }}
      >
        <XButton handleClose={handleClose} />
        <div>
          <h2 className="text-headline4 font-bold mb-4 text-secondary dark:text-secondary_dark">
            Settings
          </h2>
          <div className="mb-4">
            <label className="block text-secondary dark:text-secondary_dark text-sm font-bold mb-2">
              Volume
            </label>
            <div className="flex items-center">
              <div className="progress mx-3">
                <div className="path"></div>
                <div className="knob" style={{ left: `${settings.volume}%` }}></div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.volume}
                  onChange={(e) => updateSettings({ volume: parseInt(e.target.value) })}
                  className="w-full opacity-0 absolute top-0 left-0 h-full"
                />
              </div>
              <span className="w-12 text-center text-secondary dark:text-secondary_dark font-bold">
                {settings.volume}%
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <MyButton onClick={handleClose} size="small">
              Close
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
