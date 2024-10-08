import { useContext } from 'react';
import SettingsContext, { SettingsContextProps } from '../contexts/SettingsContext';

export const useSettings = (): SettingsContextProps => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
