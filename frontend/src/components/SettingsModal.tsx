import { useState, useEffect } from "react";
import MyButton from "./MyButton";
import XButton from "./XButton";
import { useSettings } from "../hooks/useSettings";
import VolumeControl from "./VolumeControl";

type SettingsModalProps = {
  onClose: () => void;
};

const SettingsModal = ({ onClose }: SettingsModalProps) => {
  const { settings, updateSettings } = useSettings();
  const [isVisible, setIsVisible] = useState(false);

  // Set modal to visible when component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Delay to allow fade-out animation
  };

  return (
    <div
      className={`fixed z-20 inset-0 bg-secondary50 bg-opacity-75 flex items-center justify-center transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
        }`}
      onClick={handleClose}
    >
      <div
        className="bg-primary dark:bg-primary_dark p-8 rounded-lg shadow-lg max-w-sm w-full md:max-w-md lg:max-w-lg relative transition-transform duration-300 transform"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
        style={{ transform: isVisible ? "translateY(0)" : "translateY(-20px)" }}
      >
        <XButton handleClose={handleClose} />
        <div>
          <h2 className="text-headline4 font-bold mb-4 text-secondary dark:text-secondary_dark">
            Settings
          </h2>
          {/* Volume controls for music and sound effects */}
          <VolumeControl
            label="Music"
            volume={settings.volume}
            onVolumeChange={(volume) => updateSettings({ volume })}
          />
          <VolumeControl
            label="Sound Effects"
            volume={settings.soundEffectsVolume}
            onVolumeChange={(soundEffectsVolume) => updateSettings({ soundEffectsVolume })}
          />
          <div className="flex justify-center">
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
