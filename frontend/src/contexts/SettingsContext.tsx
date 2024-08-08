import { createContext, useState, ReactNode, useEffect } from 'react';

// Interface for the settings state
export interface Settings {
  volume: number;
  darkMode: boolean;
  soundEffectsVolume: number;
}

// Interface for the settings context properties
export interface SettingsContextProps {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

// Create context for settings
const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return {
      volume: 50,
      darkMode: storedDarkMode ? JSON.parse(storedDarkMode) : false,
      soundEffectsVolume: 50
    };
  });

  // Function to update settings state
  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prevSettings) => {
      const updatedSettings = { ...prevSettings, ...newSettings };
      if ('darkMode' in newSettings) {
        localStorage.setItem('darkMode', JSON.stringify(updatedSettings.darkMode));
      }
      return updatedSettings;
    });
  };

  // Apply dark mode class to the document element when darkMode setting changes
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
