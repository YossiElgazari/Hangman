import { createContext, useState, ReactNode, useEffect } from 'react';

// Interface for the settings state
export interface Settings {
  volume: number;
  darkMode: boolean;
  soundEffectsVolume: number;
  [key: string]: number | boolean | string | undefined;
}

// Interface for the settings context properties
export interface SettingsContextProps {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

// Create context for settings
const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>({ volume: 50, darkMode: false, soundEffectsVolume: 50 });

  // Function to update settings state
  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
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
